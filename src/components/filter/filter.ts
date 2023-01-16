import { bindable, BindingMode, containerless, customElement } from 'aurelia';
import { AuDatatableFilter } from '../../models/filter';
import { AuDatatableRequest } from '../../models/request';
import { AuDatatableResponse } from '../../models/response';

@containerless()
@customElement('au-datatable-filter')
export class AuDatatableFilterComponent {
    @bindable({
        mode: BindingMode.twoWay
    })
    public request: AuDatatableRequest;

    @bindable() public onFilter: (request: AuDatatableRequest) => Promise<AuDatatableResponse>;
    @bindable() public btnClasses: string;
    @bindable() public filters: AuDatatableFilter[];
    @bindable() public labelClearFilter: string = 'clear filter';

    private amountOfColumns: number;
    private auTableFilter: any;
    private filterElements: any[];
    private activeFilterBtn: any;
    private filterValues: string[] = [];

    private attached(): void {
        if (!this.request.filters) {
            this.request.filters = [];
        }
        this.getColumnsCount();
        document.getElementsByTagName('html')[0].addEventListener('click', (e) => this.hideFilterDropdowns(e));
        this.request.filters.map((x) => (this.filterValues[x.selectedColumn] = x.value));
    }

    public detached(): void {
        document.getElementsByTagName('html')[0].removeEventListener('click', (e) => this.hideFilterDropdowns(e));
    }

    public shouldGenerateContent(column: number): boolean {
        const filter = this.filters.find((fltr) => fltr.applyToColumns.some((c) => c === column));
        return filter !== null && filter !== undefined;
    }

    public shouldAddFilter(filter: AuDatatableFilter, column: number): boolean {
        return filter.applyToColumns.some((x) => x === column);
    }

    public async selectFilter(event: any, filter: AuDatatableFilter, column: number): Promise<void> {
        if (typeof this.onFilter !== 'function') {
            throw new Error('[au-table-filter:selectFilter] No onFilter() callback has been set');
        }
        const value = this.filterValues[column];
        if (value) {
            this.removeFiltersForColumn(column);
            this.request.filters.push({
                value,
                description: filter.description,
                selectedColumn: column,
                applyToColumns: []
            });
            this.setActiveLabelFilter(event);
            const response = await this.onFilter(this.request);
            this.request.totalRecords = response.totalRecords;
            this.request.data = response.data;
            this.reset();
        } else {
            this.showInputWarning(event);
        }
    }

    public isSelectedFilter(filter: AuDatatableFilter, column: number): boolean {
        return this.request.filters.some((x) => x.description === filter.description && x.selectedColumn === column);
    }

    public showFilters(event: any): void {
        this.activeFilterBtn = event.target;
        const parent = event.target.closest('div');
        const filter = parent.getElementsByClassName('au-filter-container')[0];
        filter.style.display = filter.style.display === 'block' ? 'none' : 'block';
    }

    public async inputChanged(column: number): Promise<void> {
        if (!this.filterValues[column]) {
            this.removeFiltersForColumn(column);
            const response = await this.onFilter(this.request);
            this.request.totalRecords = response.totalRecords;
            this.request.data = response.data;
            this.reset();
        } else {
            if (this.request.filters.some((x) => x.selectedColumn === column)) {
                const filter = this.request.filters.find((x) => x.selectedColumn === column);
                filter.value = this.filterValues[column];
                const response = await this.onFilter(this.request);
                this.request.totalRecords = response.totalRecords;
                this.request.data = response.data;
                this.reset();
            }
        }
    }

    public async clearFilter(event: any, column: number): Promise<void> {
        const parent = event.target.closest('td');
        const input = parent.getElementsByClassName('au-filter-input')[0];
        this.removeFiltersForColumn(column);
        input.value = '';
        this.filterValues[column] = undefined;
        const response = await this.onFilter(this.request);
        this.request.totalRecords = response.totalRecords;
        this.request.data = response.data;
        this.reset();
    }

    private getColumnsCount(): void {
        this.auTableFilter = document.getElementsByClassName('au-table-filter')[0];
        const thead = this.auTableFilter.closest('thead');
        const headers = thead.getElementsByTagName('tr')[0];
        this.amountOfColumns = headers.getElementsByTagName('th').length;
    }

    private hideFilterDropdowns(event: any): void {
        if (this.activeFilterBtn === event.target) {
            return;
        }
        const ignoreElements = ['au-filter', 'au-filter-cell', 'au-filter-input', 'au-clear', 'au-clear-icon'];
        if (Array.from(event.target.classList).some((x) => ignoreElements.some((y) => y === x))) {
            return;
        }
        if (!this.filterElements) {
            this.filterElements = this.auTableFilter.getElementsByClassName('au-filter-container');
        }
        Array.from(this.filterElements).forEach((x) => (x.style.display = 'none'));
    }

    private showInputWarning(event: any): void {
        const parent = event.target.closest('td');
        const input = parent.getElementsByClassName('au-filter-input')[0];
        input.style.border = '1px red solid';
        setTimeout(() => (input.style.border = '1px #ddd solid'), 500);
    }

    private setActiveLabelFilter(event: any): void {
        event.target.classList.add('active');
    }

    private removeFiltersForColumn(column: number): void {
        this.removeActiveLabelsForColumn(column);
        this.request.filters = this.request.filters.filter((x) => x.selectedColumn !== column);
    }

    private removeActiveLabelsForColumn(column: number): void {
        const filters = this.auTableFilter.getElementsByClassName('au-filter');
        Array.from(filters).forEach((element: HTMLElement) => {
            if (element.getAttribute('data-column') === column.toString()) {
                element.classList.remove('active');
            }
        });
    }

    private reset(): void {
        this.request.currentPage = this.request.totalRecords > 0 ? 1 : 0;
        this.request.skip = 0;
    }
}

import { bindable, bindingMode, customElement, inlineView } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';
import { AuDatatableFilter } from './AuDatatableFilter';
import { AuDatatableResponse } from './AuDatatableResponse';

@customElement('au-datatable-filter')
@inlineView(`
    <template>
        <tr class="au-table-filter">
            <td class="au-filter-cell" repeat.for="i of amountOfColumns" if.bind="parameters">
                <div if.bind="shouldGenerateContent(i)">
                    <input class="au-filter-input" value.two-way="filterValues[i]" type="text" change.delegate="inputChanged(i)">
                    <button class="au-filter-btn" click.delegate="showFilters($event)" class.bind="btnClasses">&#9783;</button>
                    <div class="au-filter-container">
                        <ul class="au-filters">
                            <li class="au-filter \${ isSelectedFilter(filter, i) ? 'active': ''}" data-column="\${i}" repeat.for="filter of filters" if.bind="shouldAddFilter(filter ,i)" click.delegate="selectFilter($event, filter, i)"> \${ filter.description }</li>
                            <li class="au-clear" click.delegate="clearFilter($event, i)">\${ labelClearFilter } <span class="au-clear-icon">&#10006;</span></li>
                        </ul>
                    </div>
                </div>
            </td>
            <style>
                .au-table-filter .au-filter-input {
                    width: calc(100% - 35px);
                    transition: 1s;
                    outline: none;
                    height: 25px;
                    border: 1px #ddd solid;
                }

                .au-table-filter .au-filter-btn {
                    width: 30px;
                    margin-left: 5px;
                    float: right;
                    outline: none;
                }

                .au-table-filter .au-filter-container {
                    width: 100%;
                    display: none;
                }

                .au-table-filter .au-filter-container .au-filters {
                    list-style: none;
                    padding: 10px;
                    border: 1px solid #ddd;
                    margin-top: 5px;
                    position: relative;
                    background-color: white;
                    top: 0;
                    bottom: 0;
                    font-size: 8pt;
                    right: 0;
                    margin-bottom: 0;
                }

                .au-table-filter .au-filter-container .au-filters .au-filter {
                    border-bottom: 1px solid #ddd;
                    padding: 2px 5px;
                }

                .au-table-filter .au-filter-container .au-filters .au-clear {
                    margin-top: 20px;
                    font-size: 8pt;
                    padding: 2px 5px;
                    background: #333;
                    color: white;
                }

                .au-table-filter .au-filter-container .au-filters .au-clear:hover {
                    cursor: pointer;
                }

                .au-table-filter .au-filter-container .au-filters .au-clear .au-clear-icon {
                    color: white;
                    float: right;
                    margin-top: 1px;
                }

                .au-table-filter .au-filter-container .au-filters .au-filter.active {
                    background-color: #b9b8b8;
                    color: white
                }

                .au-table-filter .au-filter-container .au-filters .au-filter:hover {
                    cursor: pointer;
                }
            </style>
        </tr>
    </template>
`)
export class AuDatatableFilterComponent {

    @bindable public onFilter: Function;
    @bindable public columns: Array<number>;
    @bindable public btnClasses: string;
    @bindable public filters: Array<AuDatatableFilter>;
    @bindable public labelClearFilter: string = 'Clear filter';

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    }) public parameters: AuDatatableParameters;

    private amountOfColumns: number;
    private auTableFilter: any;
    private filterElements: Array<any>;
    private activeFilterBtn: any;
    private filterValues: Array<string | undefined> = [];

    public attached(): void {
        this.getColumnsCount();
        document.getElementsByTagName('html')[0].addEventListener('click', e => this.hideFilterDropdowns(e));
    }

    public detached(): void {
        document.getElementsByTagName('html')[0].removeEventListener('click', e => this.hideFilterDropdowns(e));
    }

    public shouldGenerateContent(column: number): boolean {
        return this.columns.some(x => x == column);
    }

    public shouldAddFilter(filter: AuDatatableFilter, column: number): boolean {
        return filter.applyToColumns.some(x => x == column);
    }

    public async selectFilter(event: any, filter: AuDatatableFilter, column: number): Promise<void> {
        if (typeof this.onFilter != 'function')
            throw new Error('[au-table-filter:select_filter] No onFilter() callback has been set');
        let value = this.filterValues[column];
        if (value) {
            this.removeFiltersForColumn(column);
            this.parameters.filters.push({
                value: value,
                description: filter.description,
                selectedColumn: column
            });
            this.setActiveLabelFilter(event);
            let response = await this.onFilter(this.parameters) as AuDatatableResponse;
            this.parameters.totalRecords = response.totalRecords;
            this.parameters.tableData = response.data;
            this.reset();
        } else {
            this.showInputWarning(event);
        }
    }

    public isSelectedFilter(filter: AuDatatableFilter, column: number): boolean {
        return this.parameters.filters.some(x => x.description == filter.description && x.selectedColumn == column);
    }

    public showFilters(event: any): void {
        this.activeFilterBtn = event.target;
        let parent = event.target.closest('div');
        let filter = parent.getElementsByClassName('au-filter-container')[0];
        filter.style.display = filter.style.display == 'block' ? 'none' : 'block';
    }

    public async inputChanged(column: number): Promise<void> {
        if (!this.filterValues[column]) {
            this.removeFiltersForColumn(column);
            let response = await this.onFilter(this.parameters) as AuDatatableResponse;
            this.parameters.totalRecords = response.totalRecords;
            this.parameters.tableData = response.data;
            this.reset();
        } else {
            if (this.parameters.filters.some(x => x.selectedColumn == column)) {
                let filter = this.parameters.filters.find(x => x.selectedColumn == column);
                filter.value = this.filterValues[column];
                let response = await this.onFilter(this.parameters) as AuDatatableResponse;
                this.parameters.totalRecords = response.totalRecords;
                this.parameters.tableData = response.data;
                this.reset();
            }
        }
    }

    public async clearFilter(event: any, column: number): Promise<void> {
        let parent = event.target.closest('td');
        let input = parent.getElementsByClassName('au-filter-input')[0];
        this.removeFiltersForColumn(column);
        input.value = '';
        this.filterValues[column] = undefined;
        let response = await this.onFilter(this.parameters) as AuDatatableResponse;
        this.parameters.totalRecords = response.totalRecords;
        this.parameters.tableData = response.data;
        this.reset();
    }

    private getColumnsCount(): void {
        this.auTableFilter = document.getElementsByClassName('au-table-filter')[0];
        let thead = this.auTableFilter.closest('thead');
        let headers = thead.getElementsByTagName('tr')[0];
        this.amountOfColumns = headers.getElementsByTagName('th').length;
    }

    private hideFilterDropdowns(event: any): void {
        if (this.activeFilterBtn == event.target) return;
        let ignoreElements = ['au-filter', 'au-filter-cell', 'au-filter-input', 'au-clear', 'au-clear-icon'];
        if (Array.from(event.target.classList).some(x => ignoreElements.some(y => y == x))) return;
        if (!this.filterElements) this.filterElements = this.auTableFilter.getElementsByClassName('au-filter-container');
        Array.from(this.filterElements).forEach(x => (<any>x).style.display = 'none');
    }

    private showInputWarning(event: any): void {
        let parent = event.target.closest('td');
        let input = parent.getElementsByClassName('au-filter-input')[0];
        input.style.border = '1px red solid';
        setTimeout(() => input.style.border = '1px #ddd solid', 500);
    }

    private setActiveLabelFilter(event: any): void {
        event.target.classList.add('active');
    }

    private removeFiltersForColumn(column: number): void {
        this.removeActiveLabelsForColumn(column);
        this.parameters.filters = this.parameters.filters
            .filter(x => x.selectedColumn != column);
    }

    private removeActiveLabelsForColumn(column: number): void {
        let filters = this.auTableFilter.getElementsByClassName('au-filter');
        Array.from(filters).forEach(x => {
            if ((<any>x).getAttribute('data-column') == column) (<any>x).classList.remove('active')
        });
    }

    private reset(): void {
        this.parameters.currentPage = this.parameters.totalRecords > 0 ? 1 : 0;
        this.parameters.skip = 0;
    }
}	
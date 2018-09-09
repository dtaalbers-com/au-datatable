import { bindable, bindingMode, customAttribute, inject } from 'aurelia-framework';
import IAuDatatableRequest from '../models/request';
import IAuDatatableResponse from '../models/response';

@customAttribute('au-datatable-sort')
@inject(Element)
export default class AuDatatableSortAttribute {

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    }) private request: IAuDatatableRequest;

    @bindable() private onSort: (request: IAuDatatableRequest) => IAuDatatableResponse;
    @bindable() private columns: number[];
    @bindable() private activeColor: string = '#f44336';
    @bindable() private inactiveColor: string = '#000';

    private headers: HTMLTableHeaderCellElement[];
    private template: string = `
        <span class="sorting" style="float: right;">
            <span class="ascending sort" style="font-weight: bold;">&#8593;</span>
            <span class="descending sort" style="margin-left: -3px;">&#8595;</span>
        </span>
    `;

    constructor(
        private element: Element
    ) { }

    private attached(): void {
        if (this.element.nodeName !== 'THEAD') {
            throw new Error('[au-table-sort:attached] au-table-sort needs to be bound to a THEAD node');
        }
        this.headers = Array.from(this.element.getElementsByTagName('th'));
        this.columns.forEach((column) => {
            const header = this.headers[column];
            header.style.cursor = 'pointer';
            header.setAttribute('index', column.toString());
            header.addEventListener('click', event => this.sort(event));
            header.innerHTML = header.innerHTML + this.template;
            if (this.request.sortBy === column) {
                this.setActive(header, this.request.sortDirection);
            }
        });
    }

    private async sort(event: any): Promise<void> {
        if (typeof this.onSort !== 'function') {
            throw new Error('[au-table-sort:sort] No onSort() callback has been set');
        }
        const columnIndex = this.getIndex(event.target);
        if (this.request.sortBy === columnIndex) {
            switch (this.request.sortDirection) {
                case 'ascending':
                    this.request.sortDirection = 'descending';
                    break;
                case 'descending':
                    this.request.sortDirection = undefined;
                    break;
                default:
                    this.request.sortDirection = 'ascending';
                    break;
            }
        } else {
            this.request.sortBy = columnIndex;
            this.request.sortDirection = 'ascending'
        }
        this.setActive(event.target, this.request.sortDirection);
        const response = await this.onSort(this.request) as IAuDatatableResponse;
        this.request.data = response.data;
        this.request.totalRecords = response.totalRecords;
    }

    private setActive(target: any, direction: string | undefined): void {
        this.reset();
        if (target.nodeName === 'SPAN') {
            target = target.parentNode.closest('th');
        }
        const sortContainer = target.getElementsByClassName('sorting')[0];
        const sort = sortContainer.getElementsByClassName(direction)[0];
        if (sort) {
            sort.style.color = this.activeColor;
        }
    }

    private reset(): void {
        this.headers.forEach((x) => {
            const sorts = x.getElementsByClassName('sorting');
            if (sorts.length === 0) {
                return;
            }
            Array.from(sorts[0].getElementsByTagName('span'))
                .forEach((span) => span.style.color = this.inactiveColor);
        });
    }

    private getIndex(target: any): number {
        if (target.nodeName === 'SPAN') {
            target = target.parentNode.closest('th');
        }
        return target.getAttribute('index');
    }
}

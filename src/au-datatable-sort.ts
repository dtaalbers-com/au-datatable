import { bindable, customAttribute, bindingMode, inject } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';
import { AuDatatableResponse } from './AuDatatableResponse';

@customAttribute('au-datatable-sort')
@inject(Element)
export class AuDatatableSortCustomAttribute {

    @bindable public onSort: Function;
    @bindable public columns: Array<number>;
    @bindable public activeColor: string = '#f44336';
    @bindable public inactiveColor: string = '#000'

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    }) public parameters: AuDatatableParameters;

    private headers: Array<HTMLTableHeaderCellElement>;
    private template: string = `
        <span class="sorting" style="float: right;">
            <span class="ascending sort" style="font-weight: bold;">&#8593;</span>
            <span class="descending sort" style="margin-left: -3px;">&#8595;</span>
        </span>
    `;

    constructor(
        private element: Element
    ) { }

    public attached(): void {
        if (this.element.nodeName != 'THEAD')
            throw new Error('[au-table-sort:attached] au-table-sort needs to be bound to a THEAD node');
        this.headers = Array.from(this.element.getElementsByTagName('th'));
        this.columns.forEach(column => {
            let header = this.headers[column];
            header.style.cursor = 'pointer';
            header.setAttribute('index', column.toString());
            header.addEventListener('click', event => this.sort(event));
            header.innerHTML = header.innerHTML + this.template;
            if (this.parameters.sortColumn == column)
                this.setActive(header, this.parameters.sortDirection)
        });
    }

    public async sort(event: any): Promise<void> {
        if (typeof this.onSort != 'function')
            throw new Error('[au-table-sort:sort] No onSort() callback has been set');
        let columnIndex = this.getIndex(event.target);
        if (this.parameters.sortColumn == columnIndex) {
            switch (this.parameters.sortDirection) {
                case 'ascending':
                    this.parameters.sortDirection = 'descending';
                    break;
                case 'descending':
                    this.parameters.sortDirection = undefined;
                    break;
                default:
                    this.parameters.sortDirection = 'ascending';
                    break;
            }
        } else {
            this.parameters.sortColumn = columnIndex;
            this.parameters.sortDirection = 'ascending'
        }
        this.setActive(event.target, this.parameters.sortDirection);
        let response = await this.onSort(this.parameters) as AuDatatableResponse;
        this.parameters.tableData = response.data;
        this.parameters.totalRecords = response.totalRecords;
    }

    private setActive(target: any, direction: string | undefined): void {
        this.reset();
        if (target.nodeName == 'SPAN') target = target.parentNode.closest('th');
        let sortContainer = target.getElementsByClassName('sorting')[0];
        let sort = sortContainer.getElementsByClassName(direction)[0];
        if (sort) sort.style.color = this.activeColor;
    }

    private reset(): void {
        this.headers.forEach(x => {
            let sorts = x.getElementsByClassName('sorting');
            if (sorts.length == 0) return;
            Array.from(sorts[0].getElementsByTagName('span')).forEach(x => x.style.color = this.inactiveColor);
        });
    }

    private getIndex(target: any): number {
        if (target.nodeName == 'SPAN') target = target.parentNode.closest('th');
        return target.getAttribute('index');
    }
}	
import { bindable, customAttribute, bindingMode, inject } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';
import { AuDatatableResponse } from './AuDatatableResponse';

@customAttribute('au-datatable-sort')
@inject(Element)
export class AuDatatableSortCustomAttribute {

    @bindable public on_sort: Function;
    @bindable public columns: Array<number>;
    @bindable public active_color: string = '#f44336';
    @bindable public inactive_color: string = '#000'

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
            if (this.parameters.sort_column == column)
                this.set_active(header, this.parameters.sort_direction)
        });
    }

    public async sort(event: any): Promise<void> {
        if (typeof this.on_sort != 'function')
            throw new Error('[au-table-sort:sort] No on_sort() callback has been set');
        let column_index = this.get_index(event.target);
        if (this.parameters.sort_column == column_index) {
            switch (this.parameters.sort_direction) {
                case 'ascending':
                    this.parameters.sort_direction = 'descending';
                    break;
                case 'descending':
                    this.parameters.sort_direction = undefined;
                    break;
                default:
                    this.parameters.sort_direction = 'ascending';
                    break;
            }
        } else {
            this.parameters.sort_column = column_index;
            this.parameters.sort_direction = 'ascending'
        }
        this.set_active(event.target, this.parameters.sort_direction);
        let response = await this.on_sort(this.parameters) as AuDatatableResponse;
        this.parameters.table_data = response.data;
        this.parameters.total_records = response.total_records;
    }

    private set_active(target: any, direction: string | undefined): void {
        this.reset();
        if (target.nodeName == 'SPAN') target = target.parentNode.closest('th');
        let sort_container = target.getElementsByClassName('sorting')[0];
        let sort = sort_container.getElementsByClassName(direction)[0];
        if (sort) sort.style.color = this.active_color;
    }

    private reset(): void {
        this.headers.forEach(x => {
            let sorts = x.getElementsByClassName('sorting');
            if (sorts.length == 0) return;
            Array.from(sorts[0].getElementsByTagName('span')).forEach(x => x.style.color = this.inactive_color);
        });
    }

    private get_index(target: any): number {
        if (target.nodeName == 'SPAN') target = target.parentNode.closest('th');
        return target.getAttribute('index');
    }
}	
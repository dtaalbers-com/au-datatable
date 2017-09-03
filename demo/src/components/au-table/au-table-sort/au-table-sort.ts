import { autoinject, bindable, customAttribute, bindingMode } from 'aurelia-framework';

@customAttribute('au-table-sort')
export class AuTableSort {

    @bindable public on_sort: Function;
    @bindable public columns: string;
    @bindable public template: string = `
        <span class="sorting" style="margin-top: -5px;">
            <span class="ascending sort">&#8593;</span>
            <span class="descending sort">&#8595;</span>
        </span>
    `;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public sort_column: string;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public sort_direction: string;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public skip: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public page_size: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public search_query: string;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public current_page: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public table_data: Array<any>;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public total_records: number;

    constructor(
        private element: Element
    ) { }

    public attached(): void {
        if (this.element.nodeName != 'THEAD')
            throw new Error('[au-table-sort:attached] au-table-sort needs to be bound to a THEAD node');
        let headers = this.element.getElementsByTagName('th');
        this.columns.split(',').forEach(column => {
            let header = headers.item(parseInt(column));
            header.style.cursor = 'pointer';
            header.setAttribute('index', column);
            header.addEventListener('click', event => this.sort(event));
            header.innerHTML = header.innerHTML + this.template;
        });
    }

    public async sort(event: any): Promise<void> {
        if (typeof this.on_sort != 'function')
            throw new Error('[au-table-sort:sort] No on_sort() callback has been set');
        let column_index = event.target.getAttribute('index');
        if (this.sort_column == column_index) {
            switch (this.sort_direction) {
                case 'ascending':
                    this.sort_direction = 'descending';
                    break;
                case 'descending':
                    this.sort_direction = undefined;
                    break;
                default:
                    this.sort_direction = 'ascending';
                    break;
            }
        } else {
            this.sort_column = column_index;
            this.sort_direction = 'ascending'
        }
        console.log(this.sort_column);
        console.log(this.sort_direction);
    }
}	
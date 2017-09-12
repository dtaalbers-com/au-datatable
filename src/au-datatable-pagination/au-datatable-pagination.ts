import { customElement, bindable, bindingMode, BindingEngine, Disposable, inject, inlineView } from 'aurelia-framework';
import { AuDatatableParameters } from '../au-datatable-contracts/AuDatatableParameters';
import { AuDatatableResponse } from '../au-datatable-contracts/AuDatatableResponse';

@customElement('au-datatable-pagination')
@inject(BindingEngine)
@inlineView(`
    <template>
        <nav>
            <ul class="au-pagination pagination">
                <li>
                    <a click.delegate="previous_page()">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li if.bind="parameters.current_page > amount_of_pages + 1">
                    <a click.delegate="change_page(0)">1</a>
                </li>
                <li if.bind="parameters.current_page > amount_of_pages + 2" class="dots">
                    <a>...</a>
                </li>
                <li if.bind="!refreshing" repeat.for="i of previous_pages">
                    <a click.delegate="change_page((parameters.current_page + i) - amount_of_pages - 1)"> \${ calculate_previous_page_number(i) }</a>
                </li>
                <li class="active">
                    <a>\${ parameters.current_page }</a>
                </li>
                <li if.bind="!refreshing" repeat.for="i of following_pages">
                    <a click.delegate="change_page(parameters.current_page + i)">\${ parameters.current_page + (i + 1) }</a>
                </li>
                <li if.bind="parameters.current_page < total_pages - 3" class="dots">
                    <a>...</a>
                </li>
                <li if.bind="parameters.current_page < total_pages - amount_of_pages">
                    <a click.delegate="change_page(total_pages - 1)">\${ total_pages }</a>
                </li>
                <li>
                    <a click.delegate="next_page()">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
            <style>
                .au-pagination {
                    list-style: none;
                }

                .au-pagination li {
                    float: left;
                }

                .au-pagination li a {
                    padding: 5px 10px;
                }
            </style>    
        </nav>
    </template>
`)
export class AuDatatablePaginationComponent {

    @bindable public amount_of_pages: number = 2;
    @bindable public on_next_page: Function;
    @bindable public on_previous_page: Function;
    @bindable public on_page_change: Function;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    }) public parameters: AuDatatableParameters;

    private total_pages: number;
    private following_pages: number;
    private previous_pages: number;
    private refreshing: boolean = false;
    private subscriptions: Array<Disposable> = [];

    constructor(
        private binding_engine: BindingEngine
    ) { }

    public attached(): void {
        this.subscriptions.push(this.binding_engine
            .propertyObserver(this.parameters, 'current_page')
            .subscribe(() => this.data_change()));
        this.subscriptions.push(this.binding_engine
            .propertyObserver(this.parameters, 'total_records')
            .subscribe(() => this.data_change()));
        this.subscriptions.push(this.binding_engine
            .propertyObserver(this.parameters, 'page_size')
            .subscribe(() => this.data_change()));
    }

    private data_change(): void {
        if (this.parameters.current_page == undefined || this.parameters.total_records == undefined) return;
        this.refreshing = true;
        this.total_pages = Math.ceil(parseInt(this.parameters.total_records.toString()) / this.parameters.page_size);
        this.previous_pages = this.parameters.current_page - this.amount_of_pages <= 0
            ? this.parameters.current_page - 1
            : this.amount_of_pages;
        this.following_pages = this.parameters.current_page + this.amount_of_pages > this.total_pages
            ? this.parameters.current_page == this.total_pages ? 0 : this.total_pages - this.parameters.current_page
            : this.amount_of_pages;
        this.refreshing = false;
    }

    public async next_page(): Promise<void> {
        if (typeof this.on_next_page != 'function')
            throw new Error('[au-table-pagination:next_page] No on_next_page() callback has been set');
        if (this.parameters.current_page == this.total_pages) return;
        this.refreshing = true;
        this.parameters.skip += this.parameters.page_size;
        this.parameters.current_page++;
        let response = await this.on_next_page(this.parameters) as AuDatatableResponse;
        this.parameters.total_records = response.total_records;
        this.parameters.table_data = response.data;
        this.refreshing = false;
    }

    public async previous_page(): Promise<void> {
        if (typeof this.on_previous_page != 'function')
            throw new Error('[au-table-pagination:previous_page] No on_previous_page() callback has been set');
        if (this.parameters.current_page == 1) return;
        this.refreshing = true;
        this.parameters.skip -= this.parameters.page_size;
        this.parameters.current_page--;
        let response = await this.on_next_page(this.parameters) as AuDatatableResponse;
        this.parameters.total_records = response.total_records;
        this.parameters.table_data = response.data;
        this.refreshing = false;
    }

    public async change_page(page: number): Promise<void> {
        if (typeof this.on_page_change != 'function')
            throw new Error('[au-table-pagination:change_page] No on_page_change() callback has been set');
        if (page + 1 == this.parameters.current_page) return;
        this.refreshing = true;
        if (page < 0) page = 0;
        this.parameters.skip = page * this.parameters.page_size;
        this.parameters.current_page = page + 1;
        let response = await this.on_next_page(this.parameters) as AuDatatableResponse;
        this.parameters.total_records = response.total_records;
        this.parameters.table_data = response.data;
        this.refreshing = false;
    }

    public calculate_previous_page_number(index: number): number {
        let number = (this.parameters.current_page + index) - this.amount_of_pages;
        return number == 0 ? 1 : number;
    }

    public detached(): void {
        this.subscriptions.forEach(x => x.dispose());
    }
}
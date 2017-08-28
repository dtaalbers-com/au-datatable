import { customElement, bindable, bindingMode } from 'aurelia-framework';

customElement('au-table-pagination')
export class AuTablePagination {

    @bindable public amount_of_pages: number = 2;
    @bindable public on_next_page: Function;
    @bindable public on_previous_page: Function;
    @bindable public on_page_change: Function;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public page_size: number;
    @bindable({ changeHandler: 'initial_pagination_load' }) public total_records: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay, changeHandler: 'initial_pagination_load' }) public current_page: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public search_query: string;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public table_data: any;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public skip: number;

    private total_pages: number;
    private following_pages: number;
    private previous_pages: number;
    private refreshing: boolean = false;

    private initial_pagination_load(): void {
        if (this.current_page == undefined || this.total_records == undefined) return;
        this.refreshing = true;
        this.total_pages = Math.ceil(parseInt(this.total_records.toString()) / this.page_size);
        this.previous_pages = this.current_page - this.amount_of_pages <= 0
            ? this.current_page - 1
            : this.amount_of_pages;
        this.following_pages = this.current_page + this.amount_of_pages > this.total_pages
            ? this.current_page == this.total_pages ? 0 : this.total_pages - this.current_page
            : this.amount_of_pages;
        this.refreshing = false;
    }

    public async next_page(): Promise<void> {
        if (typeof this.on_next_page != 'function')
            throw new Error('[au-table-pagination:next_page] No on_next_page() callback has been set');
        if (this.current_page == this.total_pages) return;
        this.refreshing = true;
        this.skip += this.page_size;
        this.current_page++;
        this.table_data = await this.on_next_page({
            skip: this.skip,
            page_size: this.page_size,
            current_page: this.current_page,
            search_query: this.search_query
        });
        this.refreshing = false;
    }

    public async previous_page(): Promise<void> {
        if (typeof this.on_previous_page != 'function')
            throw new Error('[au-table-pagination:previous_page] No on_previous_page() callback has been set');
        if (this.current_page == 1) return;
        this.refreshing = true;
        this.skip -= this.page_size;
        this.current_page--;
        this.table_data = await this.on_previous_page({
            skip: this.skip,
            page_size: this.page_size,
            current_page: this.current_page,
            search_query: this.search_query
        });
        this.refreshing = false;
    }

    public async change_page(page: number): Promise<void> {
        if (typeof this.on_page_change != 'function')
            throw new Error('[au-table-pagination:change_page] No on_page_change() callback has been set');
        if (page + 1 == this.current_page) return;
        this.refreshing = true;
        if (page < 0) page = 0;
        this.skip = page * this.page_size;
        let next = (page + 1) * this.page_size;
        this.current_page = page + 1;
        this.table_data = await this.on_previous_page({
            skip: this.skip,
            page_size: this.page_size,
            current_page: this.current_page,
            search_query: this.search_query
        });
        this.refreshing = false;
    }

    public calculate_previous_page_number(index: number): number {
        let number = (this.current_page + index) - this.amount_of_pages;
        return number == 0 ? 1 : number;
    }
}
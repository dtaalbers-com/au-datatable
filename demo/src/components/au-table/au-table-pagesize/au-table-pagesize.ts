import { customElement, bindable, bindingMode } from 'aurelia-framework';

@customElement('au-table-pagesize')
export class AuTablePagesize {

    private selected_page_size: number;
    private sizes: Array<number>;

    @bindable public page_sizes: string;
    @bindable public classes: string;
    @bindable public on_page_size_change: Function;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public skip: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public page_size: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public search_query: string;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public current_page: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public total_records: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public table_data: any;

    public bind(): void {
        if (!this.page_sizes || this.page_sizes.length == 0)
            throw new Error('[au-table-pagesize:bind] No page sizes has been bound.');
        this.sizes = this.page_sizes.split(',').map(x => parseInt(x));
        this.page_size = this.sizes[0]
    }

    public async page_size_change(): Promise<void> {
        if (typeof this.on_page_size_change != 'function')
            throw new Error('[au-table-pagesize:page_size_change] No on_page_size_change() callback has been set');
        this.page_size = this.selected_page_size;
        this.reset();
        this.table_data = await this.on_page_size_change({
            skip: this.skip,
            page_size: this.page_size,
            current_page: this.current_page,
            search_query: this.search_query
        });
    }

    private reset(): void {
        this.current_page = this.total_records > 0 ? 1 : 0;
        this.skip = 0;
    }
}
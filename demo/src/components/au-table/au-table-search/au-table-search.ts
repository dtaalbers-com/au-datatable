import { customElement, bindable, bindingMode } from 'aurelia-framework';

@customElement('au-table-search')
export class AuTableSearch {

    @bindable public placeholder: string;
    @bindable public input_classes: string;
    @bindable public on_search_change: Function;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public skip: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public page_size: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public search_query: string;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public current_page: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public table_data: any;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public total_records: any;

    public async search(): Promise<void> {
        if (typeof this.on_search_change != 'function')
            throw new Error('[au-table-search:search] No on_search_change() callback has been set');
        this.reset();
        this.table_data = await this.on_search_change({
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
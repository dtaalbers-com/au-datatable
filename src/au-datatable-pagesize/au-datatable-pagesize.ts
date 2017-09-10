import { customElement, bindable } from 'aurelia-framework';
import { AuDatatableParameters } from '../au-datatable-contracts/AuDatatableParameters';
import { AuDatatableResponse } from '../au-datatable-contracts/AuDatatableResponse';

@customElement('au-datatable-pagesize')
export class AuDatatablePagesizeComponent {

    private selected_page_size: number;

    @bindable public page_sizes: Array<number>;
    @bindable public classes: string;
    @bindable public on_page_size_change: Function;
    @bindable public parameters: AuDatatableParameters

    public bind(): void {
        if (!this.page_sizes || this.page_sizes.length == 0)
            throw new Error('[au-table-pagesize:bind] No page sizes has been bound.');
        this.parameters.page_size = this.page_sizes[0]
    }

    public async page_size_change(): Promise<void> {
        if (typeof this.on_page_size_change != 'function')
            throw new Error('[au-table-pagesize:page_size_change] No on_page_size_change() callback has been set');
        this.parameters.page_size = this.selected_page_size;
        this.reset();
        let response = await this.on_page_size_change(this.parameters) as AuDatatableResponse;
        this.parameters.total_records = response.total_records;
        this.parameters.table_data = response.data;
    }

    private reset(): void {
        this.parameters.current_page = this.parameters.total_records > 0 ? 1 : 0;
        this.parameters.skip = 0;
    }
}
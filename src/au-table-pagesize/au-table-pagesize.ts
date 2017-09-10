import { customElement, bindable } from 'aurelia-framework';
import { AuTableParameters } from '../au-table-contracts/AuTableParameters';
import { AuTableResponse } from '../au-table-contracts/AuTableResponse';

@customElement('au-table-pagesize')
export class AuTablePagesize {

    private selected_page_size: number;

    @bindable public page_sizes: Array<number>;
    @bindable public classes: string;
    @bindable public on_page_size_change: Function;
    @bindable public parameters: AuTableParameters

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
        let response = await this.on_page_size_change(this.parameters) as AuTableResponse;
        this.parameters.total_records = response.total_records;
        this.parameters.table_data = response.data;
    }

    private reset(): void {
        this.parameters.current_page = this.parameters.total_records > 0 ? 1 : 0;
        this.parameters.skip = 0;
    }
}
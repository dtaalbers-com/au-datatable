import { customElement, bindable, inlineView } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';
import { AuDatatableResponse } from './AuDatatableResponse';

@customElement('au-datatable-pagesize')
@inlineView(`
    <template>
        <div class="au-table-pagesize">
            <select class.bind="classes" value.bind="selected_page_size" change.delegate="page_size_change()">
                <option repeat.for="size of page_sizes" model.bind="size">\${ size }</option>
            </select>
        </div>
    </template>
`)
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
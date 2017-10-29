import { customElement, bindable, inlineView } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';
import { AuDatatableResponse } from './AuDatatableResponse';

@customElement('au-datatable-pagesize')
@inlineView(`
    <template>
        <div class="au-table-pagesize">
            <select class.bind="classes" value.bind="selectedPageSize" change.delegate="pageSizeChange()" matcher.bind="setSelected">
                <option repeat.for="size of pageSizes" model.bind="size">\${ size }</option>
            </select>
        </div>
    </template>
`)
export class AuDatatablePagesizeComponent {

    private selectedPageSize: number;

    @bindable public pageSizes: Array<number>;
    @bindable public classes: string;
    @bindable public onPageSizeChange: Function;
    @bindable public parameters: AuDatatableParameters

    public bind(): void {
        if (!this.pageSizes || this.pageSizes.length == 0)
            throw new Error('[au-table-pagesize:bind] No page sizes has been bound.');
        if (!this.parameters.pageSize) this.parameters.pageSize = this.pageSizes[0];
    }

    public setSelected = (option: number): boolean => {
        return option == this.parameters.pageSize;
    }

    public async pageSizeChange(): Promise<void> {
        if (typeof this.onPageSizeChange != 'function')
            throw new Error('[au-table-pagesize:pageSizeChange] No onPageSizeChange() callback has been set');
        this.parameters.pageSize = this.selectedPageSize;
        this.reset();
        let response = await this.onPageSizeChange(this.parameters) as AuDatatableResponse;
        this.parameters.totalRecords = response.totalRecords;
        this.parameters.tableData = response.data;
    }

    private reset(): void {
        this.parameters.currentPage = this.parameters.totalRecords > 0 ? 1 : 0;
        this.parameters.skip = 0;
    }
}
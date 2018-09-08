import { bindable, customElement } from 'aurelia-framework';
import IAuDatatableRequest from '../../models/request';
import IAuDatatableResponse from '../../models/response';

@customElement('au-datatable-pagesize')
export default class AuDatatablePagesizeComponent {

    private selectedPageSize: number;

    @bindable() private pageSizes: Array<number>;
    @bindable() private classes: string;
    @bindable() private onPageSizeChange: Function;
    @bindable() private request: IAuDatatableRequest

    private bind(): void {
        if (!this.pageSizes || this.pageSizes.length === 0) {
            throw new Error('[au-table-pagesize:bind] No page sizes has been bound.');
        }
        if (!this.request.pageSize) {
            this.request.pageSize = this.pageSizes[0];
        }
    }

    private setSelected = (option: number): boolean => {
        return option === this.request.pageSize;
    }

    private async pageSizeChange(): Promise<void> {
        if (typeof this.onPageSizeChange != 'function') {
            throw new Error('[au-table-pagesize:pageSizeChange] No onPageSizeChange() callback has been set');
        }
        this.request.pageSize = this.selectedPageSize;
        this.reset();
        const response = await this.onPageSizeChange(this.request) as IAuDatatableResponse;
        this.request.totalRecords = response.totalRecords;
        this.request.tableData = response.data;
    }

    private reset(): void {
        this.request.currentPage = this.request.totalRecords > 0 ? 1 : 0;
        this.request.skip = 0;
    }
}

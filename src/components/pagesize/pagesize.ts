import { bindable, customElement } from 'aurelia';
import { AuDatatableRequest } from '../../models/request';
import { AuDatatableResponse } from '../../models/response';

@customElement('au-datatable-pagesize')
export class AuDatatablePagesizeComponent {
    @bindable() public pageSizes: number[];
    @bindable() public classes: string;
    @bindable() public onPageSizeChange: (request: AuDatatableRequest) => Promise<AuDatatableResponse>;
    @bindable() public request: AuDatatableRequest;

    private selectedPageSize: number;

    public bind(): void {
        if (!this.pageSizes || this.pageSizes.length === 0) {
            throw new Error('[au-table-pagesize:bind] No page sizes has been bound.');
        }
        if (!this.request.pageSize) {
            this.request.pageSize = this.pageSizes[0];
        }
    }

    public setSelected = (option: number): boolean => {
        return option === this.request.pageSize;
    };

    public async pageSizeChange(): Promise<void> {
        if (typeof this.onPageSizeChange !== 'function') {
            throw new Error('[au-table-pagesize:pageSizeChange] No onPageSizeChange() callback has been set');
        }
        this.request.pageSize = this.selectedPageSize;
        this.reset();
        const response = await this.onPageSizeChange(this.request);
        this.request.totalRecords = response.totalRecords;
        this.request.data = response.data;
    }

    private reset(): void {
        this.request.currentPage = this.request.totalRecords > 0 ? 1 : 0;
        this.request.skip = 0;
    }
}

import { bindable, BindingMode, customAttribute } from 'aurelia';
import { AuDatatableRequest } from '../models/request';
import { AuDatatableResponse } from '../models/response';

@customAttribute('au-datatable')
export class AuDatatableAttribute {
    @bindable({
        callback: 'init'
    })
    public onInit: (request: AuDatatableRequest) => Promise<AuDatatableResponse>;

    @bindable({
        mode: BindingMode.twoWay,
        callback: 'init'
    })
    public request: AuDatatableRequest;

    public async refresh(request?: AuDatatableRequest): Promise<void> {
        if (request) this.request = request;
        else {
            this.request.data = [];
            this.request.currentPage = 1;
            this.request.skip = 0;
            this.request.searchQuery = null;
            this.request.filters = [];
        }

        const response = await this.onInit(this.request);
        this.request.data = response.data;
        this.request.totalRecords = response.totalRecords;
    }

    private async init(): Promise<void> {
        if (!this.request || !this.onInit) return;
        if (!this.request.pageSize) this.request.pageSize = 10;

        this.request.skip = 0;
        const response = await this.onInit(this.request);
        this.request.data = response.data;
        this.request.totalRecords = response.totalRecords;
        if (!this.request.currentPage) {
            this.request.currentPage = 1;
        }
    }
}

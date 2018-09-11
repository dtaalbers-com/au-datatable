import { bindable, bindingMode, customAttribute } from 'aurelia-framework';
import IAuDatatableRequest from '../models/request';
import IAuDatatableResponse from '../models/response';

@customAttribute('au-datatable')
export default class AuDatatableAttribute {

    @bindable({
        changeHandler: 'init'
    })
    private onInit: (request: IAuDatatableRequest) => IAuDatatableResponse;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'init'
    })
    private request: IAuDatatableRequest;

    private async init(): Promise<void> {
        if (!this.request || !this.onInit) {
            return;
        }
        if (!this.request.pageSize) {
            this.request.pageSize = 10;
        }
        this.request.skip = 0;
        const response = await this.onInit(this.request);
        this.request.data = response.data;
        this.request.totalRecords = response.totalRecords;
        if (!this.request.currentPage) {
            this.request.currentPage = 1;
        }
    }
}

import { bindable, bindingMode, customElement } from 'aurelia-framework';
import IAuDatatableRequest from '../../models/request';
import IAuDatatableResponse from '../../models/response';

@customElement('au-datatable-search')
export default class AuDatatableSearchComponent {

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    }) private request: IAuDatatableRequest

    @bindable private placeholder: string;
    @bindable private inputClasses: string;
    @bindable private onSearchChange: Function;

    private async search(): Promise<void> {
        if (typeof this.onSearchChange !== 'function') {
            throw new Error('[au-table-search:search] No onSearchChange() callback has been set');
        }
        this.reset();
        let response = await this.onSearchChange(this.request) as IAuDatatableResponse;
        this.request.tableData = response.data;
        this.request.totalRecords = response.totalRecords;
        this.reset();
    }

    private reset(): void {
        this.request.currentPage = this.request.totalRecords > 0 ? 1 : 0;
        this.request.skip = 0;
    }
}

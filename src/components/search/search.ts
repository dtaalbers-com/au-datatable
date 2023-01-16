import { bindable, BindingMode, customElement } from 'aurelia';
import { AuDatatableRequest } from '../../models/request';
import { AuDatatableResponse } from '../../models/response';

@customElement('au-datatable-search')
export class AuDatatableSearchComponent {
    @bindable({ mode: BindingMode.twoWay })
    public request: AuDatatableRequest;

    @bindable() public placeholder: string;
    @bindable() public inputClass: string;
    @bindable() public debounce: string = '500';
    @bindable() public onSearchChange: (request: AuDatatableRequest) => Promise<AuDatatableResponse>;

    public async search(): Promise<void> {
        if (typeof this.onSearchChange !== 'function') {
            throw new Error('[au-table-search:search] No onSearchChange() callback has been set');
        }
        this.reset();
        const response = await this.onSearchChange(this.request);
        this.request.data = response.data;
        this.request.totalRecords = response.totalRecords;
        this.reset();
    }

    private reset(): void {
        this.request.currentPage = this.request.totalRecords > 0 ? 1 : 0;
        this.request.skip = 0;
    }
}

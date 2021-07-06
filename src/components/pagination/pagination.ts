import { bindable, BindingEngine, bindingMode, customElement, Disposable, inject } from 'aurelia-framework';
import { AuDatatableRequest, IAuDatatableRequest } from '../../models/request';
import { AuDatatableResponse } from '../../models/response';

@customElement('au-datatable-pagination')
@inject(BindingEngine)
export class AuDatatablePaginationComponent {

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'dataChange'
    }) public request: AuDatatableRequest;

    @bindable() public amountOfPages: number = 2;
    @bindable() public onNextPage: (request: IAuDatatableRequest) => Promise<AuDatatableResponse>;
    @bindable() public onPreviousPage: (request: IAuDatatableRequest) => Promise<AuDatatableResponse>;
    @bindable() public onPageChange: (request: IAuDatatableRequest) => Promise<AuDatatableResponse>;

    public followingPages: number;
    public previousPages: number;
    public refreshing: boolean = false;
    private totalPages: number;
    private subscriptions: Disposable[] = [];

    constructor(
        private bindingEngine: BindingEngine
    ) { }

    public attached(): void {
        this.subscriptions.push(this.bindingEngine
            .propertyObserver(this.request, 'currentPage')
            .subscribe(() => this.dataChange()));
        this.subscriptions.push(this.bindingEngine
            .propertyObserver(this.request, 'totalRecords')
            .subscribe(() => this.dataChange()));
        this.subscriptions.push(this.bindingEngine
            .propertyObserver(this.request, 'pageSize')
            .subscribe(() => this.dataChange()));
    }

    public async nextPage(): Promise<void> {
        if (typeof this.onNextPage !== 'function') {
            throw new Error('[au-table-pagination:nextPage] No onNextPage() callback has been set');
        }
        if (this.request.currentPage === this.totalPages) {
            return;
        }
        this.refreshing = true;
        this.request.skip += this.request.pageSize;
        this.request.currentPage++;
        const response = await this.onNextPage(this.request);
        this.request.totalRecords = response.totalRecords;
        this.request.data = response.data;
        this.refreshing = false;
    }

    public async previousPage(): Promise<void> {
        if (typeof this.onPreviousPage !== 'function') {
            throw new Error('[au-table-pagination:previousPage] No onPreviousPage() callback has been set');
        }
        if (this.request.currentPage === 1) {
            return;
        }
        this.refreshing = true;
        this.request.skip -= this.request.pageSize;
        this.request.currentPage--;
        const response = await this.onPreviousPage(this.request);
        this.request.totalRecords = response.totalRecords;
        this.request.data = response.data;
        this.refreshing = false;
    }

    public async changePage(page: number): Promise<void> {
        if (typeof this.onPageChange !== 'function') {
            throw new Error('[au-table-pagination:changePage] No onChangePage() callback has been set');
        }
        if (page + 1 === this.request.currentPage) {
            return;
        }
        this.refreshing = true;
        if (page < 0) {
            page = 0;
        }
        this.request.skip = page * this.request.pageSize;
        this.request.currentPage = page + 1;
        const response = await this.onPageChange(this.request);
        this.request.totalRecords = response.totalRecords;
        this.request.data = response.data;
        this.refreshing = false;
    }

    public calculatePreviousPageNumber(index: number): number {
        const result = (this.request.currentPage + index) - this.amountOfPages;
        return result === 0 ? 1 : result;
    }

    public detached(): void {
        this.subscriptions.forEach(x => x.dispose());
    }

    private dataChange(): void {
        if (this.request.currentPage === undefined || this.request.totalRecords === undefined) {
            return;
        }
        this.refreshing = true;
        this.totalPages = Math.ceil(parseInt(this.request.totalRecords.toString(), 10) / this.request.pageSize);
        this.previousPages = this.request.currentPage - this.amountOfPages <= 0
            ? this.request.currentPage - 1
            : this.amountOfPages;
        this.followingPages = this.request.currentPage + this.amountOfPages > this.totalPages
            ? this.request.currentPage === this.totalPages ? 0 : this.totalPages - this.request.currentPage
            : this.amountOfPages;
        this.refreshing = false;
    }
}

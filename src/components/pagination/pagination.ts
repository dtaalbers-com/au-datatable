import { bindable, BindingEngine, bindingMode, customElement, Disposable, inject } from 'aurelia-framework';
import IAuDatatableRequest from '../../models/request';
import IAuDatatableResponse from '../../models/response';

@customElement('au-datatable-pagination')
@inject(BindingEngine)
export default class AuDatatablePaginationComponent {

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'dataChange'
    }) private request: IAuDatatableRequest;

    @bindable() private amountOfPages: number = 2;
    @bindable() private pagesChangeStepSize: number = 1;
    @bindable() private onNextPage: (request: IAuDatatableRequest) => IAuDatatableResponse;
    @bindable() private onPreviousPage: (request: IAuDatatableRequest) => IAuDatatableResponse;
    @bindable() private onPageChange: (request: IAuDatatableRequest) => IAuDatatableResponse;

    private totalPages: number;
    private followingPages: number;
    private previousPages: number;
    private refreshing: boolean = false;
    private subscriptions: Disposable[] = [];

    constructor(
        private bindingEngine: BindingEngine
    ) { }

    private attached(): void {
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

    private async nextPage(): Promise<void> {
        if (typeof this.onNextPage !== 'function') {
            throw new Error('[au-table-pagination:nextPage] No onNextPage() callback has been set');
        }

        return this.selectPage(+this.request.currentPage + +this.pagesChangeStepSize - 1, this.onNextPage);
    }

    private async previousPage(): Promise<void> {
        if (typeof this.onPreviousPage !== 'function') {
            throw new Error('[au-table-pagination:previousPage] No onPreviousPage() callback has been set');
        }

        return this.selectPage(+this.request.currentPage - +this.pagesChangeStepSize - 1, this.onPreviousPage);
    }

    private async changePage(page: number): Promise<void> {
        if (typeof this.onPageChange !== 'function') {
            throw new Error('[au-table-pagination:changePage] No onPageChange() callback has been set');
        }

        return this.selectPage(page, this.onPageChange);
    }

    private async selectPage(page: number, onPageSelect: (request: IAuDatatableRequest) => IAuDatatableResponse): Promise<void> {
        if (typeof onPageSelect !== 'function') {
            throw new Error('[au-table-pagination:selectPage] No onPageSelect() callback has been set');
        }
        if (page + 1 === this.request.currentPage) {
            return;
        }
        this.refreshing = true;
        if (page + 1 > this.totalPages) {
            page = this.totalPages - 1;
        }
        if (page < 0) {
            page = 0;
        }
        this.request.skip = page * this.request.pageSize;
        this.request.currentPage = page + 1;
        const response = await this.onPageChange(this.request) as IAuDatatableResponse;
        this.request.totalRecords = response.totalRecords;
        this.request.data = response.data;
        this.refreshing = false;
    }

    private calculatePreviousPageNumber(index: number): number {
        const result = (this.request.currentPage + index) - this.amountOfPages;
        return result === 0 ? 1 : result;
    }

    private detached(): void {
        this.subscriptions.forEach(x => x.dispose());
    }
}

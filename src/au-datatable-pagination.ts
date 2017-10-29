import { customElement, bindable, bindingMode, BindingEngine, Disposable, inject, inlineView } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';
import { AuDatatableResponse } from './AuDatatableResponse';

@customElement('au-datatable-pagination')
@inject(BindingEngine)
@inlineView(`
    <template>
        <nav>
            <ul class="au-pagination pagination">
                <li class="page-item">
                    <a class="page-link" click.delegate="previousPage()">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" if.bind="parameters.currentPage > amountOfPages + 1">
                    <a class="page-link" click.delegate="changePage(0)">1</a>
                </li>
                <li class="page-item dots" if.bind="parameters.currentPage > amountOfPages + 2">
                    <a class="page-link">...</a>
                </li>
                <li class="page-item" if.bind="!refreshing" repeat.for="i of previousPages">
                    <a class="page-link" click.delegate="changePage((parameters.currentPage + i) - amountOfPages - 1)"> \${ calculatePreviousPageNumber(i) }</a>
                </li>
                <li class="page-item active">
                    <a class="page-link">\${ parameters.currentPage }</a>
                </li>
                <li class="page-item" if.bind="!refreshing" repeat.for="i of followingPages">
                    <a class="page-link" click.delegate="changePage(parameters.currentPage + i)">\${ parameters.currentPage + (i + 1) }</a>
                </li>
                <li class="page-item dots" if.bind="parameters.currentPage < totalPages - 3">
                    <a class="page-link">...</a>
                </li>
                <li class="page-item" if.bind="parameters.currentPage < totalPages - amountOfPages">
                    <a class="page-link" click.delegate="changePage(totalPages - 1)">\${ totalPages }</a>
                </li>
                <li class="page-item">
                    <a class="page-link" click.delegate="nextPage()">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
            <style>
                .au-pagination {
                    list-style: none;
                }

                .au-pagination li {
                    float: left;
                }

                .au-pagination li a {
                    padding: 5px 10px;
                }
            </style>    
        </nav>
    </template>
`)
export class AuDatatablePaginationComponent {

    @bindable public amountOfPages: number = 2;
    @bindable public onNextPage: Function;
    @bindable public onPreviousPage: Function;
    @bindable public onPageChange: Function;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'dataChange'
    }) public parameters: AuDatatableParameters;

    private totalPages: number;
    private followingPages: number;
    private previousPages: number;
    private refreshing: boolean = false;
    private subscriptions: Array<Disposable> = [];

    constructor(
        private bindingEngine: BindingEngine
    ) { }

    public attached(): void {
        this.subscriptions.push(this.bindingEngine
            .propertyObserver(this.parameters, 'currentPage')
            .subscribe(() => this.dataChange()));
        this.subscriptions.push(this.bindingEngine
            .propertyObserver(this.parameters, 'totalRecords')
            .subscribe(() => this.dataChange()));
        this.subscriptions.push(this.bindingEngine
            .propertyObserver(this.parameters, 'pageSize')
            .subscribe(() => this.dataChange()));
    }

    private dataChange(): void {
        if (this.parameters.currentPage == undefined || this.parameters.totalRecords == undefined) return;
        this.refreshing = true;
        this.totalPages = Math.ceil(parseInt(this.parameters.totalRecords.toString()) / this.parameters.pageSize);
        this.previousPages = this.parameters.currentPage - this.amountOfPages <= 0
            ? this.parameters.currentPage - 1
            : this.amountOfPages;
        this.followingPages = this.parameters.currentPage + this.amountOfPages > this.totalPages
            ? this.parameters.currentPage == this.totalPages ? 0 : this.totalPages - this.parameters.currentPage
            : this.amountOfPages;
        this.refreshing = false;
    }

    public async nextPage(): Promise<void> {
        if (typeof this.onNextPage != 'function')
            throw new Error('[au-table-pagination:nextPage] No onNextPage() callback has been set');
        if (this.parameters.currentPage == this.totalPages) return;
        this.refreshing = true;
        this.parameters.skip += this.parameters.pageSize;
        this.parameters.currentPage++;
        let response = await this.onNextPage(this.parameters) as AuDatatableResponse;
        this.parameters.totalRecords = response.totalRecords;
        this.parameters.tableData = response.data;
        this.refreshing = false;
    }

    public async previousPage(): Promise<void> {
        if (typeof this.onPreviousPage != 'function')
            throw new Error('[au-table-pagination:previousPage] No onPreviousPage() callback has been set');
        if (this.parameters.currentPage == 1) return;
        this.refreshing = true;
        this.parameters.skip -= this.parameters.pageSize;
        this.parameters.currentPage--;
        let response = await this.onPreviousPage(this.parameters) as AuDatatableResponse;
        this.parameters.totalRecords = response.totalRecords;
        this.parameters.tableData = response.data;
        this.refreshing = false;
    }

    public async changePage(page: number): Promise<void> {
        if (typeof this.onPageChange != 'function')
            throw new Error('[au-table-pagination:changePage] No onChangePage() callback has been set');
        if (page + 1 == this.parameters.currentPage) return;
        this.refreshing = true;
        if (page < 0) page = 0;
        this.parameters.skip = page * this.parameters.pageSize;
        this.parameters.currentPage = page + 1;
        let response = await this.onPageChange(this.parameters) as AuDatatableResponse;
        this.parameters.totalRecords = response.totalRecords;
        this.parameters.tableData = response.data;
        this.refreshing = false;
    }

    public calculatePreviousPageNumber(index: number): number {
        let number = (this.parameters.currentPage + index) - this.amountOfPages;
        return number == 0 ? 1 : number;
    }

    public detached(): void {
        this.subscriptions.forEach(x => x.dispose());
    }
}
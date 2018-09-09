import { bindable, BindingEngine, customElement, Disposable, inject } from 'aurelia-framework';
import IAuDatatableRequest from '../../models/request';

@customElement('au-datatable-info')
@inject(BindingEngine)
export default class AuDatatableInfoComponent {

    @bindable() private message: string;
    @bindable() private labelFiltered: string;
    @bindable() private request: IAuDatatableRequest;

    private info: string;
    private startRecord: number;
    private endRecord: number;
    private currentPageCopy: any;
    private subscriptions: Disposable[] = [];

    constructor(
        private bindingEngine: BindingEngine
    ) { }

    private attached(): void {
        if (!this.message) {
            this.message = 'START_RECORD to END_RECORD of total TOTAL_RECORDS records';
        }
        if (!this.labelFiltered) {
            this.labelFiltered = 'filtered';
        }
        this.subscriptions.push(this.bindingEngine
            .propertyObserver(this.request, 'data')
            .subscribe(() => this.updateRecordInfo()));
        this.subscriptions.push(this.bindingEngine
            .propertyObserver(this.request, 'pageSize')
            .subscribe(() => this.reset()));
    }

    private detached(): void {
        this.subscriptions.forEach((x) => x.dispose());
    }

    private updateRecordInfo(): void {
        if (!this.startRecord && !this.endRecord) {
            this.startRecord = (this.request.pageSize * this.request.currentPage) - (this.request.pageSize - 1);
            this.endRecord = this.request.pageSize;
        } else {
            if (this.currentPageCopy + 1 === this.request.currentPage) {
                this.nextPage();
            } else if (this.currentPageCopy - 1 === this.request.currentPage) {
                this.previousPage();
            } else {
                this.pageChanged();
            }
        }
        this.currentPageCopy = this.request.currentPage;
        this.translateInfo();
    }

    private translateInfo(): void {
        if (this.request.totalRecords === undefined
            || this.request.pageSize === undefined
            || this.startRecord === undefined
            || this.endRecord === undefined) {
            return;
        }
        this.info = this.message
            .replace('START_RECORD', this.request.data.length === 0
                ? '0'
                : this.startRecord.toString())
            .replace('END_RECORD', this.request.data.length < this.request.pageSize
                ? this.request.totalRecords.toString()
                : (this.request.data.length * this.request.currentPage).toString())
            .replace('TOTAL_RECORDS', this.request.totalRecords.toString());
    }

    private nextPage(): void {
        this.startRecord += this.request.pageSize;
        this.endRecord = (this.endRecord + this.request.pageSize) > this.request.totalRecords
            ? this.request.totalRecords
            : this.endRecord + this.request.pageSize;
    }

    private previousPage(): void {
        this.startRecord -= this.request.pageSize;
        this.endRecord = this.request.pageSize * this.request.currentPage;
    }

    private pageChanged(): void {
        const page = this.request.currentPage - 1;
        this.startRecord = (page * this.request.pageSize) + 1;
        const next = (page + 1) * this.request.pageSize;
        this.endRecord = next > this.request.totalRecords ? this.request.totalRecords : next;
    }

    private reset(): void {
        this.request.currentPage = 1;
        this.currentPageCopy = 1;
    }
}

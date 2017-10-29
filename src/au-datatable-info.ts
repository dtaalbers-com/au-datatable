import { customElement, bindable, BindingEngine, Disposable, inject, inlineView } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';

@customElement('au-datatable-info')
@inject(BindingEngine)
@inlineView(`
    <template>
        <div class="au-table-info">
            \${ info } 
            <span if.bind="parameters.searchQuery.length > 0 && parameters.tableData.length > 0">&nbsp;(\${ labelFiltered })</span>
        </div>
    </template>
`)
export class AuDatatableInfoComponent {

    @bindable public message: string;
    @bindable public labelFiltered: string;
    @bindable public parameters: AuDatatableParameters

    private info: string;
    private startRecord: number;
    private endRecord: number;
    private currentPageCopy: any;
    private subscriptions: Array<Disposable> = [];

    constructor(
        private bindingEngine: BindingEngine
    ) { }

    public attached(): void {
        if (!this.message) this.message = 'START_RECORD to END_RECORD of total TOTAL_RECORDS records';
        if (!this.labelFiltered) this.labelFiltered = 'filtered';
        this.subscriptions.push(this.bindingEngine
            .propertyObserver(this.parameters, 'tableData')
            .subscribe(() => this.updateRecordInfo()));
        this.subscriptions.push(this.bindingEngine
            .propertyObserver(this.parameters, 'pageSize')
            .subscribe(() => this.reset()));
    }

    public detached(): void {
        this.subscriptions.forEach(x => x.dispose());
    }

    private updateRecordInfo(): void {
        if (!this.startRecord && !this.endRecord) {
            this.startRecord = (this.parameters.pageSize * this.parameters.currentPage) - (this.parameters.pageSize - 1);
            this.endRecord = this.parameters.pageSize;
        } else {
            if (this.currentPageCopy + 1 == this.parameters.currentPage) {
                this.nextPage();
            } else if (this.currentPageCopy - 1 == this.parameters.currentPage) {
                this.previousPage();
            } else {
                this.pageChanged();
            }
        }
        this.currentPageCopy = this.parameters.currentPage;
        this.translateInfo();
    }

    private translateInfo(): void {
        if (this.parameters.totalRecords == undefined
            || this.parameters.pageSize == undefined
            || this.startRecord == undefined
            || this.endRecord == undefined) return;
        this.info = this.message
            .replace('START_RECORD', this.parameters.tableData.length == 0
                ? '0'
                : this.startRecord.toString())
            .replace('END_RECORD', this.parameters.tableData.length < this.parameters.pageSize
                ? this.parameters.totalRecords.toString()
                : (this.parameters.tableData.length * this.parameters.currentPage).toString())
            .replace('TOTAL_RECORDS', this.parameters.totalRecords.toString());
    }

    private nextPage(): void {
        this.startRecord += this.parameters.pageSize;
        this.endRecord = (this.endRecord + this.parameters.pageSize) > this.parameters.totalRecords
            ? this.parameters.totalRecords
            : this.endRecord + this.parameters.pageSize;
    }

    private previousPage(): void {
        this.startRecord -= this.parameters.pageSize;
        this.endRecord = this.parameters.pageSize * this.parameters.currentPage;
    }

    private pageChanged(): void {
        let page = this.parameters.currentPage - 1;
        this.startRecord = (page * this.parameters.pageSize) + 1;
        let next = (page + 1) * this.parameters.pageSize;
        this.endRecord = next > this.parameters.totalRecords ? this.parameters.totalRecords : next;
    }

    private reset(): void {
        this.parameters.currentPage = 1;
        this.currentPageCopy = 1;
    }
}
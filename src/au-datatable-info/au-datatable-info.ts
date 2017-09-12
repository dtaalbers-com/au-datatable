import { customElement, bindable, BindingEngine, Disposable, inject, inlineView } from 'aurelia-framework';
import { AuDatatableParameters } from '../au-datatable-contracts/AuDatatableParameters';

@customElement('au-datatable-info')
@inject(BindingEngine)
@inlineView(`
    <template>
        <div class="au-table-info">
            \${ info } 
            <span if.bind="search_query.length > 0 && table_data.length > 0">&nbsp;(\${ label_filtered })</span>
        </div>
    </template>
`)
export class AuDatatableInfoComponent {

    @bindable public message: string;
    @bindable public label_filtered: string;
    @bindable public parameters: AuDatatableParameters

    private info: string;
    private start_record: number;
    private end_record: number;
    private current_page_copy: any;
    private subscriptions: Array<Disposable> = [];

    constructor(
        private binding_engine: BindingEngine
    ) { }

    public attached(): void {
        if (!this.message) this.message = 'START_RECORD to END_RECORD of total TOTAL_RECORDS records';
        if (!this.label_filtered) this.label_filtered = 'filtered';
        this.subscriptions.push(this.binding_engine
            .propertyObserver(this.parameters, 'table_data')
            .subscribe(() => this.update_record_info()));
        this.subscriptions.push(this.binding_engine
            .propertyObserver(this.parameters, 'page_size')
            .subscribe(() => this.reset()));
    }

    public detached(): void {
        this.subscriptions.forEach(x => x.dispose());
    }

    private update_record_info(): void {
        if (!this.start_record && !this.end_record) {
            this.start_record = 1;
            this.end_record = this.parameters.page_size;
        } else {
            if (this.current_page_copy + 1 == this.parameters.current_page) {
                this.next_page();
            } else if (this.current_page_copy - 1 == this.parameters.current_page) {
                this.previous_page();
            } else {
                this.page_changed();
            }
        }
        this.current_page_copy = this.parameters.current_page;
        this.translate_info();
    }

    private translate_info(): void {
        if (this.parameters.total_records == undefined
            || this.parameters.page_size == undefined
            || this.start_record == undefined
            || this.end_record == undefined) return;
        this.info = this.message
            .replace('START_RECORD', this.parameters.table_data.length == 0
                ? '0'
                : this.start_record.toString())
            .replace('END_RECORD', this.parameters.table_data.length < this.parameters.page_size
                ? this.parameters.total_records.toString()
                : (this.parameters.table_data.length * this.parameters.current_page).toString())
            .replace('TOTAL_RECORDS', this.parameters.total_records.toString());
    }

    private next_page(): void {
        this.start_record += this.parameters.page_size;
        this.end_record = (this.end_record + this.parameters.page_size) > this.parameters.total_records
            ? this.parameters.total_records
            : this.end_record + this.parameters.page_size;
    }

    private previous_page(): void {
        this.start_record -= this.parameters.page_size;
        this.end_record = this.parameters.page_size * this.parameters.current_page;
    }

    private page_changed(): void {
        let page = this.parameters.current_page - 1;
        this.start_record = (page * this.parameters.page_size) + 1;
        let next = (page + 1) * this.parameters.page_size;
        this.end_record = next > this.parameters.total_records ? this.parameters.total_records : next;
    }

    private reset(): void {
        this.parameters.current_page = 1;
        this.current_page_copy = 1;
    }
}
import { customElement, bindable, bindingMode } from 'aurelia-framework';

@customElement('au-table-info')
export class AuTableInfo {

    @bindable public message: string;
    @bindable public label_filtered: string;

    private info: string;
    private start_record: number;
    private end_record: number;
    private current_page_copy;

    @bindable({ changeHandler: 'translate_info' }) public page_size: number;
    @bindable({ changeHandler: 'translate_info' }) public search_query: string;
    @bindable({ changeHandler: 'translate_info' }) public table_data: Array<any>;
    @bindable({ changeHandler: 'translate_info' }) public total_records: any;
    @bindable({ changeHandler: 'update_record_info' }) public current_page: any;

    public attached(): void {
        if (!this.message) this.message = 'START_RECORD to END_RECORD of total TOTAL_RECORDS record';
        if (!this.label_filtered) this.label_filtered = 'filtered';
    }

    private update_record_info(): void {
        if (!this.start_record && !this.end_record) {
            this.start_record = 1;
            this.end_record = this.page_size;
        } else {
            if (this.current_page_copy + 1 == this.current_page) {
                this.next_page();
            } else if (this.current_page_copy - 1 == this.current_page) {
                this.previous_page();
            } else {
                this.page_changed();
            }
        }
        this.current_page_copy = this.current_page;
        this.translate_info();
        console.log('serach')
    }

    private translate_info(): void {
        if (this.total_records == undefined
            || this.page_size == undefined
            || this.start_record == undefined
            || this.end_record == undefined) return;
        console.log('123', this.total_records)
        this.info = this.message
            .replace('START_RECORD', this.table_data.length == 0
                ? '0'
                : this.start_record.toString())
            .replace('END_RECORD', this.table_data.length < this.page_size
                ? this.total_records
                : (this.table_data.length * this.current_page).toString())
            .replace('TOTAL_RECORDS', this.total_records.toString());
    }

    private next_page(): void {
        this.start_record += this.page_size;
        this.end_record = (this.end_record + this.page_size) > this.total_records
            ? this.total_records
            : this.end_record + this.page_size;
    }

    private previous_page(): void {
        this.start_record -= this.page_size;
        this.end_record = this.page_size * this.current_page;
    }

    private page_changed(): void {
        let page = this.current_page - 1;
        this.start_record = (page * this.page_size) + 1;
        let next = (page + 1) * this.page_size;
        this.end_record = next > this.total_records ? this.total_records : next;
    }
}
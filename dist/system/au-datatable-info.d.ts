import { BindingEngine } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';
export declare class AuDatatableInfoComponent {
    private binding_engine;
    message: string;
    label_filtered: string;
    parameters: AuDatatableParameters;
    private info;
    private start_record;
    private end_record;
    private current_page_copy;
    private subscriptions;
    constructor(binding_engine: BindingEngine);
    attached(): void;
    detached(): void;
    private update_record_info();
    private translate_info();
    private next_page();
    private previous_page();
    private page_changed();
    private reset();
}

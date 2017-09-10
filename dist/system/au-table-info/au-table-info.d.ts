import { BindingEngine } from 'aurelia-framework';
import { AuTableParameters } from '../au-table-contracts/AuTableParameters';
export declare class AuTableInfo {
    private binding_engine;
    message: string;
    label_filtered: string;
    parameters: AuTableParameters;
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

import { BindingEngine } from 'aurelia-framework';
import { AuDatatableParameters } from '../au-datatable-contracts/AuDatatableParameters';
export declare class AuTablePaginationComponent {
    private binding_engine;
    amount_of_pages: number;
    on_next_page: Function;
    on_previous_page: Function;
    on_page_change: Function;
    parameters: AuDatatableParameters;
    private total_pages;
    private following_pages;
    private previous_pages;
    private refreshing;
    private subscriptions;
    constructor(binding_engine: BindingEngine);
    attached(): void;
    private data_change();
    next_page(): Promise<void>;
    previous_page(): Promise<void>;
    change_page(page: number): Promise<void>;
    calculate_previous_page_number(index: number): number;
    detached(): void;
}

import { BindingEngine } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';
export declare class AuDatatablePaginationComponent {
    private bindingEngine;
    amountOfPages: number;
    onNextPage: Function;
    onPreviousPage: Function;
    onPageChange: Function;
    parameters: AuDatatableParameters;
    private totalPages;
    private followingPages;
    private previousPages;
    private refreshing;
    private subscriptions;
    constructor(bindingEngine: BindingEngine);
    attached(): void;
    private data_change();
    nextPage(): Promise<void>;
    previousPage(): Promise<void>;
    changePage(page: number): Promise<void>;
    calculatePreviousPageNumber(index: number): number;
    detached(): void;
}

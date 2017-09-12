import { BindingEngine } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';
export declare class AuDatatableInfoComponent {
    private bindingEngine;
    message: string;
    labelFiltered: string;
    parameters: AuDatatableParameters;
    private info;
    private startRecord;
    private endRecord;
    private currentPageCopy;
    private subscriptions;
    constructor(bindingEngine: BindingEngine);
    attached(): void;
    detached(): void;
    private updateRecordInfo();
    private translateInfo();
    private nextPage();
    private previousPage();
    private pageChanged();
    private reset();
}

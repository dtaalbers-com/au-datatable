import { AuDatatableParameters } from './AuDatatableParameters';
export declare class AuDatatableSortCustomAttribute {
    private element;
    onSort: Function;
    columns: Array<number>;
    activeColor: string;
    inactiveColor: string;
    parameters: AuDatatableParameters;
    private headers;
    private template;
    constructor(element: Element);
    attached(): void;
    sort(event: any): Promise<void>;
    private setActive(target, direction);
    private reset();
    private getIndex(target);
}

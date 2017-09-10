import { AuDatatableParameters } from '../au-datatable-contracts/AuDatatableParameters';
export declare class AuTableSortCustomAttribute {
    private element;
    on_sort: Function;
    columns: Array<number>;
    active_color: string;
    inactive_color: string;
    parameters: AuDatatableParameters;
    private headers;
    private template;
    constructor(element: Element);
    attached(): void;
    sort(event: any): Promise<void>;
    private set_active(target, direction);
    private reset();
    private get_index(target);
}

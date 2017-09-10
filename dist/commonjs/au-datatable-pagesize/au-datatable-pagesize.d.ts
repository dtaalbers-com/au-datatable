import { AuDatatableParameters } from '../au-datatable-contracts/AuDatatableParameters';
export declare class AuTablePagesizeComponent {
    private selected_page_size;
    page_sizes: Array<number>;
    classes: string;
    on_page_size_change: Function;
    parameters: AuDatatableParameters;
    bind(): void;
    page_size_change(): Promise<void>;
    private reset();
}

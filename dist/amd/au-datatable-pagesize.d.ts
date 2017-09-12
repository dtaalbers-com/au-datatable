import { AuDatatableParameters } from './AuDatatableParameters';
export declare class AuDatatablePagesizeComponent {
    private selected_page_size;
    page_sizes: Array<number>;
    classes: string;
    on_page_size_change: Function;
    parameters: AuDatatableParameters;
    bind(): void;
    page_size_change(): Promise<void>;
    private reset();
}

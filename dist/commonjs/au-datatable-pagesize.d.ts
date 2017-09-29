import { AuDatatableParameters } from './AuDatatableParameters';
export declare class AuDatatablePagesizeComponent {
    private selectedPageSize;
    pageSizes: Array<number>;
    classes: string;
    onPageSizeChange: Function;
    parameters: AuDatatableParameters;
    bind(): void;
    pageSizeChange(): Promise<void>;
    private reset();
}

import { AuDatatableParameters } from './AuDatatableParameters';
export declare class AuDatatablePagesizeComponent {
    private selectedPageSize;
    pageSizes: Array<number>;
    classes: string;
    onPageSizeChange: Function;
    parameters: AuDatatableParameters;
    bind(): void;
    setSelected: (option: number) => boolean;
    pageSizeChange(): Promise<void>;
    private reset();
}

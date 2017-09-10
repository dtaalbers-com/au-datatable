import { AuTableParameters } from '../au-table-contracts/AuTableParameters';
export declare class AuTablePagesize {
    private selected_page_size;
    page_sizes: Array<number>;
    classes: string;
    on_page_size_change: Function;
    parameters: AuTableParameters;
    bind(): void;
    page_size_change(): Promise<void>;
    private reset();
}

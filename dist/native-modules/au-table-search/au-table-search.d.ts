import { AuTableParameters } from '../au-table-contracts/AuTableParameters';
export declare class AuTableSearch {
    placeholder: string;
    input_classes: string;
    on_search_change: Function;
    parameters: AuTableParameters;
    search(): Promise<void>;
    private reset();
}

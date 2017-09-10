import { AuDatatableParameters } from '../au-datatable-contracts/AuDatatableParameters';
export declare class AuTableSearchComponent {
    placeholder: string;
    input_classes: string;
    on_search_change: Function;
    parameters: AuDatatableParameters;
    search(): Promise<void>;
    private reset();
}

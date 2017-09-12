import { AuDatatableParameters } from './AuDatatableParameters';
export declare class AuDatatableSearchComponent {
    placeholder: string;
    input_classes: string;
    on_search_change: Function;
    parameters: AuDatatableParameters;
    search(): Promise<void>;
    private reset();
}

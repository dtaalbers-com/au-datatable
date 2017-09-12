import { AuDatatableParameters } from './AuDatatableParameters';
export declare class AuDatatableSearchComponent {
    placeholder: string;
    inputClasses: string;
    onSearchChange: Function;
    parameters: AuDatatableParameters;
    search(): Promise<void>;
    private reset();
}

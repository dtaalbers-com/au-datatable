export interface AuDatatableFilter {
    description: string;
    value?: string | undefined;
    selectedColumn?: number;
    applyToColumns?: Array<number>;
}
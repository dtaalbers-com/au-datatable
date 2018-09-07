export interface IAuDatatableFilter {
    description: string;
    value: string | undefined;
    selectedColumn: number;
    applyToColumns: number[];
}

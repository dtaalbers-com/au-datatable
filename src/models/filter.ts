export interface IAuDatatableFilter {
    description?: string;
    value?: string | undefined;
    selectedColumn?: number;
    applyToColumns?: number[];
}

export class AuDatatableFilter {
    public description: string;
    public value: string | undefined;
    public selectedColumn: number;
    public applyToColumns: number[];

    constructor(data: IAuDatatableFilter) {
        this.description = data?.description;
        this.value = data?.value;
        this.selectedColumn = data?.selectedColumn;
        this.applyToColumns = data?.applyToColumns;
    }
}


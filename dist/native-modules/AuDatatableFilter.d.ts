export interface AuDatatableFilter {
    description: string;
    value?: string | undefined;
    selected_column?: number;
    apply_to_columns?: Array<number>;
}

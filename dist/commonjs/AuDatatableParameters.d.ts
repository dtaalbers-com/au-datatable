import { AuDatatableFilter } from './AuDatatableFilter';
export interface AuDatatableParameters {
    searchQuery: string;
    skip: number;
    pageSize: number;
    totalRecords: number;
    tableData: Array<any>;
    currentPage: number;
    sortDirection: string | undefined;
    sortColumn: number;
    filters: Array<AuDatatableFilter>;
}

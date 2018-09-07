import { IAuDatatableFilter } from './filter';

export interface IAuDatatableRequest {
    searchQuery: string;
    skip: number;
    pageSize: number;
    totalRecords: number;
    tableData: any[];
    currentPage: number;
    sortDirection: string | undefined;
    sortColumn: number;
    filters: IAuDatatableFilter[];
}

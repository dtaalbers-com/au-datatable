import { AuDatatableFilter } from './AuDatatableFilter';

export class AuDatatableParameters {
    searchQuery?: string;
    skip?: number = 0;
    pageSize?: number = 10;
    totalRecords?: number;
    tableData?: Array<any>;
    currentPage?: number;
    sortDirection?: string | undefined = 'ascending';
    sortColumn?: number = 0;
    filters?: Array<AuDatatableFilter> = [];
}
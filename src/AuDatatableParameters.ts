import { AuDatatableFilter } from './AuDatatableFilter';

export class AuDatatableParameters {
    searchQuery?: string;
    skip?: number;
    pageSize?: number;
    totalRecords: number;
    tableData: Array<any>;
    currentPage?: number;
    sortDirection?: string | undefined = 'ascending';
    sortColumn?: number = 0;
    filters?: Array<AuDatatableFilter>;
}
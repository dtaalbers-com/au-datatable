import { AuDatatableFilter } from './filter';

export interface IAuDatatableRequest {
    searchQuery?: string;
    skip?: number;
    pageSize?: number;
    totalRecords?: number;
    data?: any[];
    currentPage?: number;
    sortDirection?: string | undefined;
    sortBy?: string;
    filters?: AuDatatableFilter[];
}

export class AuDatatableRequest {
    public searchQuery?: string;
    public skip?: number;
    public pageSize?: number;
    public totalRecords?: number;
    public data?: any[];
    public currentPage?: number;
    public sortDirection?: string | undefined;
    public sortBy?: string;
    public filters?: AuDatatableFilter[];

    constructor(data: IAuDatatableRequest) {
        this.searchQuery = data?.searchQuery;
        this.skip = data?.skip;
        this.pageSize = data?.pageSize;
        this.totalRecords = data?.totalRecords;
        this.data = data?.data;
        this.currentPage = data?.currentPage;
        this.sortDirection = data?.sortDirection;
        this.sortBy = data?.sortBy;
        this.filters = data?.filters;
    }
}


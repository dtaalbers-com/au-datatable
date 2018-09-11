import IAuDatatableFilter from './filter';

export default interface IAuDatatableRequest {
    searchQuery?: string;
    skip?: number;
    pageSize?: number;
    totalRecords?: number;
    data?: any[];
    currentPage?: number;
    sortDirection?: string | undefined;
    sortBy?: number;
    filters?: IAuDatatableFilter[];
}

import {IAuTableFilter} from './IAuTableFilter';

export interface IAuTableParameters {
    search_query: string;
    skip: number;
    page_size: number;
    total_records: number;
    table_data: Array<any>;
    current_page: number;
    sort_direction: string;
    sort_column: number;
    filters: Array<IAuTableFilter>;
}
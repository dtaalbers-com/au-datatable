import 'bootstrap';
import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { AuDatatableParameters } from 'au-datatable';
import { AuDatatableFilter } from 'au-datatable';
import { AuDatatableResponse } from 'au-datatable';

@autoinject()
export class App {

    public data: Array<any>;

    public parameters: AuDatatableParameters = {
        searchQuery: undefined,
        totalRecords: undefined,
        tableData: undefined,
        pageSize: 10,
        skip: 0,
        sortColumn: 1,
        sortDirection: 'ascending',
        currentPage: 1,
        filters: []
    }

    public table_filters: Array<AuDatatableFilter> =
    [
        {
            description: 'Contains',
            applyToColumns: [1, 3, 4, 5, 6]
        },
        {
            description: 'Greater Than',
            applyToColumns: [2]
        },
        {
            description: 'Smaller Than',
            applyToColumns: [2]
        },
        {
            description: 'Equals',
            applyToColumns: [1, 2, 3, 4, 5, 6]
        }
    ];

    constructor(
        private http: HttpClient
    ) { }

    public async attached(): Promise<void> {
        let response = await this.fetch_data(this.parameters);
        this.data = response.data;
        this.parameters.totalRecords = response.totalRecords;
    }

    public next_page = async (parameters: AuDatatableParameters): Promise<AuDatatableResponse> => {
        try {
            let response = await this.fetch_data(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:next_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public previous_page = async (parameters: AuDatatableParameters): Promise<AuDatatableResponse> => {
        try {
            let response = await this.fetch_data(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:previous_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public change_page = async (parameters: AuDatatableParameters): Promise<AuDatatableResponse> => {
        try {
            let response = await this.fetch_data(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public sort = async (parameters: AuDatatableParameters): Promise<AuDatatableResponse> => {
        try {
            let response = await this.fetch_data(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:sort] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public search = async (parameters: AuDatatableParameters): Promise<AuDatatableResponse> => {
        try {
            let response = await this.fetch_data(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public page_size_changed = async (parameters: AuDatatableParameters): Promise<AuDatatableResponse> => {
        try {
            let response = await this.fetch_data(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public filter = async (parameters: AuDatatableParameters): Promise<AuDatatableResponse> => {
        try {
            let response = await this.fetch_data(parameters) as AuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:filter] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    private async fetch_data(parameters: AuDatatableParameters): Promise<AuDatatableResponse> {
        let direction = parameters.sortDirection == undefined
            ? undefined
            : parameters.sortDirection == 'ascending' ? 0 : 1;
        let filters = parameters.filters.map(x => {
            return {
                value: x.value,
                column: x.selectedColumn,
                description: this.description_to_enum(x.description)
            };
        });
        let response = await this.http.fetch('https://api.dtaalbers.com/au-datatable/datatable', {
            method: 'POST',
            body: json({
                skip: parameters.skip,
                page_size: parameters.pageSize,
                search_query: parameters.searchQuery,
                sort_column: parameters.sortColumn,
                sort_direction: direction,
                filters: filters
            })
        })
        let mapped = await response.json();
        return {
            data: mapped.data,
            totalRecords: mapped.total_records
        } as AuDatatableResponse;
    }

    private description_to_enum(description: string): number {
        switch (description) {
            case 'Greater Than': return 0;
            case 'Smaller Than': return 1;
            case 'Equals': return 2;
            case 'Contains': return 3;
            default: return undefined;
        }
    }
}

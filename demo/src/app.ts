import 'bootstrap';
import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { AuDatatableParameters } from 'au-datatable';
import { AuDatatableFilter } from 'au-datatable';
import { IAuDatatableResponse } from 'au-datatable';

@autoinject()
export class App {

    public data: Array<any>;

    public parameters: AuDatatableParameters = {
        search_query: undefined,
        total_records: undefined,
        table_data: undefined,
        page_size: 10,
        skip: 0,
        sort_column: 1,
        sort_direction: 'ascending',
        current_page: 1,
        filters: []
    }

    public table_filters: Array<AuDatatableFilter> =
    [
        {
            description: 'Contains',
            apply_to_columns: [1, 3, 4, 5, 6]
        },
        {
            description: 'Greater Than',
            apply_to_columns: [2]
        },
        {
            description: 'Smaller Than',
            apply_to_columns: [2]
        },
        {
            description: 'Equals',
            apply_to_columns: [1, 2, 3, 4, 5, 6]
        }
    ];

    constructor(
        private http: HttpClient
    ) { }

    public async attached(): Promise<void> {
        let response = await this.fetch_data(this.parameters);
        this.data = response.data;
        this.parameters.total_records = response.total_records;
    }

    public next_page = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetch_data(parameters) as IAuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:next_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public previous_page = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetch_data(parameters) as IAuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:previous_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public change_page = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetch_data(parameters) as IAuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public sort = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetch_data(parameters) as IAuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:sort] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public search = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetch_data(parameters) as IAuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public page_size_changed = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetch_data(parameters) as IAuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public filter = async (parameters: AuDatatableParameters): Promise<any> => {
        try {
            let response = await this.fetch_data(parameters) as IAuDatatableResponse;
            return response;
        } catch (e) {
            alert(`[app:filter] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    private async fetch_data(parameters: AuDatatableParameters): Promise<any> {
        let direction = parameters.sort_direction == undefined
            ? undefined
            : parameters.sort_direction == 'ascending' ? 0 : 1;
        let filters = parameters.filters.map(x => {
            return {
                value: x.value,
                column: x.selected_column,
                description: this.description_to_enum(x.description)
            };
        });
        return await this.http.fetch('https://api.dtaalbers.com/aurelia-bs-datatable/datatable', {
            method: 'POST',
            body: json({
                skip: parameters.skip,
                page_size: parameters.page_size,
                search_query: parameters.search_query,
                sort_column: parameters.sort_column,
                sort_direction: direction,
                filters: filters
            })
        }).then(x => x.json()) as any;
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

import 'bootstrap';
import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { IAuTableParameters } from "./components/au-table/IAuTableParameters";

@autoinject()
export class App {

    public data: Array<any>;

    public parameters: IAuTableParameters = {
        search_query: undefined,
        total_records: undefined,
        table_data: undefined,
        page_size: 10,
        skip: 0,
        sort_column: 1,
        sort_direction: 'ascending',
        current_page: 1,
    }

    constructor(
        private http: HttpClient
    ) { }

    public async attached(): Promise<void> {
        let response = await this.fetch_data(this.parameters);
        this.data = response.data;
        this.parameters.total_records = response.total_records;
    }

    public next_page = async (parameters: IAuTableParameters): Promise<void> => {
        try {
            let response = await this.fetch_data(parameters);
            return response.data;
        } catch (e) {
            alert(`[app:next_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public sort = async (parameters: IAuTableParameters): Promise<void> => {
        try {
            let response = await this.fetch_data(parameters);
            return response.data;
        } catch (e) {
            alert(`[app:sort] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public previous_page = async (parameters: IAuTableParameters): Promise<void> => {
        try {
            let response = await this.fetch_data(parameters);
            return response.data;
        } catch (e) {
            alert(`[app:previous_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public change_page = async (parameters: IAuTableParameters): Promise<void> => {
        try {
            let response = await this.fetch_data(parameters);
            return response.data;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public search = async (parameters: IAuTableParameters): Promise<void> => {
        try {
            let response = await this.fetch_data(parameters);
            this.parameters.total_records = response.total_records;
            return response.data;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public page_size_changed = async (parameters: IAuTableParameters): Promise<void> => {
        try {
            let response = await this.fetch_data(parameters);
            return response.data;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    private async fetch_data(parameters: IAuTableParameters): Promise<any> {
        return await this.http.fetch('https://api.dtaalbers.com/aurelia-bs-datatable/datatable', {
            method: 'POST',
            body: json({
                skip: parameters.skip,
                page_size: parameters.page_size,
                search_query: parameters.search_query,
                sort_column: parameters.sort_column,
                sort_direction: parameters.sort_column,
            })
        }).then(x => x.json()) as any;
    }
}

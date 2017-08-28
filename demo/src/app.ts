import 'bootstrap';
import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class App {

    public initital_page_size: number = 10;
    public total_records: number;
    public data: Array<any>;

    constructor(
        private http: HttpClient
    ) { }

    public async attached(): Promise<void> {
        let response = await this.fetch_data({
            page_size: this.initital_page_size,
            skip: 0
        });
        this.data = response.data;
        this.total_records = response.total_records;
    }

    public next_page = async (params: any): Promise<void> => {
        try {
            let response = await this.fetch_data(params);
            return response.data;
        } catch (e) {
            alert(`[app:next_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public previous_page = async (params: any): Promise<void> => {
        try {
            let response = await this.fetch_data(params);
            return response.data;
        } catch (e) {
            alert(`[app:previous_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public change_page = async (params: any): Promise<void> => {
        try {
            let response = await this.fetch_data(params);
            return response.data;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public search = async (params: any): Promise<void> => {
        try {
            let response = await this.fetch_data(params);
            this.total_records = response.total_records;
            return response.data;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public page_size_changed = async (params: any): Promise<void> => {
        try {
            let response = await this.fetch_data(params);
            return response.data;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    private async fetch_data(params: any): Promise<any> {
        return await this.http.fetch('https://api.dtaalbers.com/aurelia-bs-datatable/datatable', {
            method: 'POST',
            body: json({
                skip: params.skip,
                page_size: params.page_size,
                search_query: params.search_query,
                sort_column: 1,
                sort_direction: 0
            })
        }).then(x => x.json()) as any;
    }
}

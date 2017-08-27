import 'bootstrap';
import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class App {

    public page_size: number = 10;
    public total_records: number;
    public data: Array<any>;

    constructor(
        private http: HttpClient
    ) { }

    public async attached(): Promise<void> {
        let response = await this.fetch_data(0, this.page_size);
        this.data = response.data;
        this.total_records = response.total_records;
    }

    public next_page = async (skip: number, page_size: number): Promise<void> => {
        try {
            let response = await this.fetch_data(skip, page_size);
            return response.data;
        } catch (e) {
            alert(`[app:next_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public previous_page = async (skip: number, page_size: number): Promise<void> => {
        try {
            let response = await this.fetch_data(skip, page_size);
            return response.data;
        } catch (e) {
            alert(`[app:previous_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    public change_page = async (skip: number, page_size: number): Promise<void> => {
        try {
            let response = await this.fetch_data(skip, page_size);
            return response.data;
        } catch (e) {
            alert(`[app:change_page] Failed to load the data: ${JSON.stringify(e)}`);
        }
    }

    private async fetch_data(skip: number, page_size: number): Promise<any> {
        return await this.http.fetch('https://api.dtaalbers.com/aurelia-bs-datatable/datatable', {
            method: 'POST',
            body: json({
                skip: skip,
                page_size: page_size,
                search_query: null,
                sort_column: 1,
                sort_direction: 0
            })
        }).then(x => x.json()) as any;
    }
}

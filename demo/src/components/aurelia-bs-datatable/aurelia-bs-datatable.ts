import { customElement, bindable } from 'aurelia-framework';
import { IDataTableSettings } from './contracts/IDataTableSettings';
import { HttpClient, json } from 'aurelia-fetch-client';
import { SortDirections } from './enums/SortDirections';

customElement('aurelia-bs-datatable')
export class AureliaBsDatatable {
    /**
     * The bindable settings for the datatable
     */
    @bindable public settings: IDataTableSettings;
    /**
     * The unique identifier for this datatable instance
     */
    public id: string = `aurelia-bs-datatable-${this.generate_guid()}`;
    /**
     * The current page of the table, will be shown active in the table navigation
     */
    public current_page: number = 1;
    /**
     * The amount of records to skip when fetching data from the api
     */
    public skip: number = 0;
    /**
     * The size of the table page, defaults to 10
     */
    public page_size: number;
    /**
     * The optional search query, can be entered by the user. Will fetch new  filterd 
     * data when a query is entered.
     */
    public search_query: string;
    /**
     * The data for the datatable
     */
    public data: Array<any>;
    /**
     * The total amount of records displayed in the footer
     */
    public total_records: number;
    /**
     * The total number of pages displayed in the navigation
     */
    public total_pages: number = 0;
    /**
     * The start record label for the current record set, displayed in the footer
     */
    public start_record: number;
    /**
     * The end record label for the current record set, displayed in the footer
     */
    public end_record: number;
    /**
     * The column we are going to sort on
     */
    public sort_column: number;
    /**
     * The sort direction we are going to sort on
     */
    public sort_direction: SortDirections;
    /**
     * A flag that indicaties whether the initital load is done
     */
    public initial_load_done: boolean = false;
    /**
     * A flag that indicates wheter or not date is loading
     */
    public is_loading: boolean = false;
    /**
     * The selected page size
     */
    public selected_pagesize: number;
    /**
     * The footer total records message
     */
    public footer_message: string;
    /**
     * The amount pages pages showns in the pager
     */
    public amount_of_pages: number = 2;

    public previous_pages: number = 0;
    public following_pages: number = 0;
    public refresh_done: boolean = false;

    /**
     * A reference to a http client
     */
    private http: HttpClient;
    /**
     * An array that holds the selected rows
     */
    private selected_rows: Array<any> = [];

    constructor() { }

    /**
     * The attached life cycle
     */
    public async attached(): Promise<void> {
        if (!this.settings)
            throw new Error('[aurelia-bs-datatable] Unable to find datatable settings. Did you forget to bind it to the component?');
        // Initialize the table
        this.init();
    }

    /**
     * Fetches the data for the table based on the table settings
     */
    public async fetch_data(): Promise<void> {
        try {
            this.is_loading = true;
            let response = await this.http.fetch(this.settings.endpoint, {
                method: 'POST',
                body: json({
                    skip: this.skip,
                    page_size: this.page_size,
                    search_query: this.search_query,
                    sort_column: this.sort_column,
                    sort_direction: this.sort_direction
                })
            }).then(x => x.json()) as any;
            this.data = response.data;
            this.total_records = response.total_records;
        } catch (e) {
            alert(`[aurelia-bs-datatable] Failed to load the data: ${e}`);
        }
        // Lets calculate the total amount of pages
        this.calculate_total_pages();
        this.refresh_pagination();
        this.is_loading = false;
    }

    /**
     * Calculates the page numbers of the previous pagination buttons
     * @param index the current index
     */
    public calculate_previous_page_number(index: number): number {
        let number = (this.current_page + index) - this.amount_of_pages;
        return number == 0 ? 1 : number;
    }

    /**
     * Refreshes the pagination based on newly set data
     */
    public refresh_pagination(): void {
        this.refresh_done = false;
        this.previous_pages = this.current_page - this.amount_of_pages <= 0
            ? this.current_page - 1
            : this.amount_of_pages;
        this.following_pages = this.current_page + this.amount_of_pages > this.total_pages
            ? this.current_page == this.total_pages ? 0 : this.total_pages - this.current_page
            : this.amount_of_pages;
        setTimeout(() => this.refresh_done = true, 10);
    }

    /**
     * Fired when clicked on a row
     * @param index The index of the clicked row
     * @param row_data The data of the row
     * @param event The click event
     */
    public row_click(index: number, row_data: any, event: any): void {
        if (this.settings.select_on_click) {
            // Check if the row data has a unique identifier
            if (!row_data.id)
                throw new Error('[aurelia-bs-datatable] When the option \'select_on_click\' is enabled, the row data must have a property named \'id\'. The \'select_on_click\' feature will not work without an id property.');
            let table = document.getElementById(this.id);
            let row = table.getElementsByTagName('tr')[index + 1];
            // Toggle selected row
            if (row.classList.contains('selected')) {
                row.classList.remove('selected');
                // Remove from selected rows
                this.selected_rows = this.selected_rows
                    .filter(x => x.id != row_data.id);
            } else {
                row.classList.add('selected');
                // Add to selected rows
                this.selected_rows.push(row_data);
            }
        } else {
            if (typeof this.settings.on_row_click == 'function')
                this.settings.on_row_click(index, row_data, event);
        }
    }

    /**
     * Fired when double clicked on a row
     * @param index The index of the double clicked row
     * @param row_data The data of the row
     * @param event The click event
     */
    public row_double_click(index: number, row_data: any, event: any): void {
        if (typeof this.settings.on_row_double_click == 'function')
            this.settings.on_row_double_click(index, row_data, event);
    }

    /**
     * Changes the page size and fetches new data
     */
    public async change_pagesize(): Promise<void> {
        this.page_size = this.selected_pagesize;
        this.reset();
        await this.fetch_data();
        // Set footer message
        this.translate_footer_record_message();
    }

    /**
     * Navigates to the next page
     */
    public next_page(): void {
        // If we are on the last page, do nothing
        if (this.current_page == this.total_pages) return;
        // Increase skip for the fetch
        this.skip += this.page_size;
        // Increase the start en end footer data
        this.start_record += this.page_size;
        this.end_record = (this.end_record + this.page_size) > this.total_records
            ? this.total_records
            : this.end_record + this.page_size;
        // Increase the current page with 1
        this.current_page++;
        // Fetch new data based on updated parameters
        this.fetch_data();
        // Set footer message
        this.translate_footer_record_message();
    }

    /**
     * Replaces the short codes in the translation labels and sets the footer message
     */
    public translate_footer_record_message(): void {
        this.footer_message = this.settings.language.record_information
            .replace('START_RECORD', this.data.length == 0
                ? '0'
                : this.start_record.toString())
            .replace('END_RECORD', this.total_records > this.page_size
                ? this.end_record.toString()
                : this.data.length.toString())
            .replace('TOTAL_RECORDS', this.total_records.toString());
    }

    /**
     * Navigates to the previous page
     */
    public previous_page(): void {
        // If we are on the first page, do nothing
        if (this.current_page == 1) return;
        // Decrease skip for the fetch
        this.skip -= this.page_size;
        // Decrease the start footer data
        this.start_record -= this.page_size;
        // Reset end record in case we are on the last page
        if (this.end_record == this.total_records) this.end_record = this.page_size * this.current_page;
        // Then decided what the update end record value should be
        this.end_record = (this.end_record - this.page_size) > this.total_records
            ? this.total_records
            : this.end_record - this.page_size;
        // Decrease the current page with 1
        this.current_page--;
        // Fetch data based on updated parameters
        this.fetch_data();
        // Set footer message
        this.translate_footer_record_message();
    }

    /**
     * Navigates the table to a specific page
     * @param page The page to change to 
     */
    public change_page(page: number): void {
        // Do nothing if we are already on the clicked page
        if (page + 1 == this.current_page) return;
        if (page < 0) page = 0;
        // Calculate fetch- and display parameters
        this.skip = page * this.page_size;
        this.start_record = (page * this.page_size) + 1;
        let next = (page + 1) * this.page_size;
        this.end_record = next > this.total_records ? this.total_records : next;
        this.current_page = page + 1; // page is zero based
        // Fetch new data
        this.fetch_data();
        // Set footer message
        this.translate_footer_record_message();
    }

    /**
     * Resets the selected rows
     */
    public reset_selection(): void {
        this.selected_rows = [];
        let table = document.getElementById(this.id);
        let rows = table.getElementsByTagName('tr');
        Array.from(rows).forEach(x => x.classList.remove('selected'));
    }

    /**
     * Fires when a user types in the search bar
     */
    public async search(): Promise<void> {
        this.reset();
        await this.fetch_data();
        // Set footer message
        this.translate_footer_record_message();
    }

    /**
     * Calculates the total pages for this table
     */
    private calculate_total_pages(): void {
        this.total_pages = Math.ceil(this.total_records / this.page_size);
    }

    /**
     * Sets the sorting based on the clicked column
     * @param column_index The index of the clicked column
     */
    public set_sorting(column_index): void {
        // Make sure we dont sort non sortable columns
        if (!this.settings.columns[column_index].sortable) return;
        if (this.sort_column == column_index) {
            // When the user is clicking the same column as the sort column
            // toggle the sort direction
            switch (this.sort_direction) {
                case SortDirections.Ascending:
                    this.sort_direction = SortDirections.Descending;
                    break;
                case SortDirections.Descending:
                    this.sort_direction = undefined;
                    break;
                default:
                    this.sort_direction = SortDirections.Ascending;
                    break;
            }
        } else {
            // The user clicked on a different column
            // reset the sort direction to ascending
            this.sort_column = column_index;
            this.sort_direction = SortDirections.Ascending;
        }
        // Fetch sorted data
        this.fetch_data();
        // Set footer message
        this.translate_footer_record_message();
    }

    /**
     * Resets the fetch paramaters
     */
    private reset(): void {
        this.skip = 0;
        this.start_record = 1;
        this.end_record = this.page_size
        this.current_page = 1;
    }

    /**
     * Checks if certain row data was previously selected or not
     */
    public is_selected(row_data): boolean {
        return this.selected_rows.some(x => x.id == row_data.id);
    }

    /**
     * Fetches the all the selected rows
     */
    public get_selected_rows(): Array<any> {
        return this.selected_rows;
    }

    /**
     * Inititalizes the datatable
     */
    private async init(): Promise<void> {
        // Configure the http client with a custom interceptor
        this.configure_http_client();
        // Set sorting data
        this.sort_column = this.settings.initial_sort_column;
        this.sort_direction = this.settings.initial_sort_direction;
        // Set pagesize
        this.page_size = this.settings.page_sizes && this.settings.page_sizes.length > 0
            ? this.settings.page_sizes[0]
            : 10;
        // Lets fetch the data
        await this.fetch_data();
        // Set footer data
        this.start_record = this.data.length >= this.page_size ? 1 : this.data.length;
        this.end_record = this.page_size;
        // Data is fetched and settings are set, lets render the table
        this.initial_load_done = true;
        // Set footer message
        this.translate_footer_record_message();
    }

    /**
     * Configures a new http client for the datatable
     */
    private configure_http_client(): void {
        this.http = new HttpClient();
        // We cant access the 'this' context in the interceptor,
        // Thus create variables so that we can access the event functions in the interceptor
        let before_request = this.settings.before_request;
        let after_response = this.settings.after_response;
        this.http.configure(config => {
            config
                .withDefaults({
                    headers: this.settings.request_headers
                })
                .withInterceptor({
                    request(request) {
                        if (typeof before_request == 'function')
                            before_request(request);
                        return request;
                    },
                    response(response) {
                        if (typeof after_response == 'function')
                            after_response(response);
                        return response;
                    }
                });
        });
    }

    /**
     * Creates a unique guid
     * @returns A guid
     */
    private generate_guid(): string {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    /**
     * Generates a random string
     * @returns A random string
     */
    private s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}
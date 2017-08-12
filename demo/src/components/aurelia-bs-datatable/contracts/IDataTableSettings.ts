import { IColumn } from '../contracts/IColumn';
import { SortDirections } from '../enums/SortDirections';

export interface IDataTableSettings {
    /**
     * The column settings for the datatable
     */
    columns: Array<IColumn>;
    /**
     * The api endpoint for this table
     */
    endpoint: string;
    /**
     * The translations for the text shown in the aurelia-bs-datatable
     */
    language: {
        /**
         * Label of the reset selection button
         */
        reset_selection: string,    
        /**
         * A string that is shown when filtered (by search query) data is shown.
         * This message will be shown after the 'label_record_information' between the '()' symbols
         */
        filtered: string,
        /**
         * The records message shown in the footer. 
         * Use folowing short codes for the record values, START_RECORD, 
         * END_RECORD, TOTAL_RECORDS. The short codes will be replaced automatically
         * Example 'Showing START_RECORD to END_RECORD of TOTAL_RECORDS entries' 
         */
        record_information: string,
        /**
         * The message shown with the loader icon
         */
        loading: string,
        /**
         * The message shown when no results are found
         */
        no_results: string,
        /**
         * The placeholder for the search input
         */
        search_placeholder: string;
    };
    /**
     * The available page sizes for the tabel
     */
    page_sizes: Array<number>;
    /**
     * A flag that indicates whether or not to show the searchbar
     */
    show_search: boolean;
    /**
     * The on row click event
     */
    on_row_click?: Function;
    /**
     * The on row double click event
     */
    on_row_double_click?: Function;
    /**
     * A flag that indicates whether or not give the clicked 
     * row the selected state or not. Note if true the on row click
     * wont fire
     */
    select_on_click?: boolean;
    /**
     * Custom classes for the buttons used in the table
     */
    button_classes?: string;
    /**
     * The initial index (zero based) of the column that were sorting on
     */
    initial_sort_column?: number;
    /**
     * The initital sort direction 
     */
    initial_sort_direction?: SortDirections;
    /**
     * The optional request headers that will be added to the request when entered
     */
    request_headers?: any;
    /**
     * Is fired before every request. Has the request as paramater
     */
    before_request?: Function;
    /**
     * Is fired when a response is received. Has the response as parameter
     */
    after_response?: Function;
}
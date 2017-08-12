export class IDataTableRequest {
    /**
     * The total amount of records to skip
     */
    skip: number;
    /**
     * The page size of the table
     */
    page_size: number;
    /**
     * The optional search query
     */
    search_query: string;
}
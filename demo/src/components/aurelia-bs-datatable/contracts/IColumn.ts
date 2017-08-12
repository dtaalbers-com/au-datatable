export class IColumn {
    /**
     * The title displayed in the column header
     */
    title: string;
    /**
     * The name of the property to fetch the cell data from
     */
    data: string;
    /**
     * (optional) A flag that indicates whether or not this column shows an image
     */
    image?: boolean;
    /**
     * (optional) The width of the column, can be written as '100px' or '100%'
     */
    width?: string;
    /**
     * A flag that indicates whether or not this column is sortable
     */
    sortable: boolean;
}
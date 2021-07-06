export default interface IAuDatatableResponse {
    data: any[];
    totalRecords: number;
}

export class AuDatatableResponse {
    public data: any[];
    public totalRecords: number;

    constructor(data: IAuDatatableResponse) {
        this.data = data?.data;
        this.totalRecords = data?.totalRecords;
    }
}

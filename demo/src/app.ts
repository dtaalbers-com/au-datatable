import { IAuDatatableFilter, IAuDatatableRequest, IAuDatatableResponse } from 'au-datatable';
import { autoinject } from 'aurelia-framework';
import 'bootstrap';
import { UserService } from './services/user-service';

@autoinject()
export class App {

    private appVersion: string = "v1.0.0"
    private data: any[];
    private request: IAuDatatableRequest = {};

    private filters: IAuDatatableFilter[] =
        [
            {
                description: 'Contains',
                applyToColumns: [1, 2, 3, 4]
            },
            {
                description: 'Equals',
                applyToColumns: [2]
            }
        ];

    constructor(
        private userService: UserService
    ) { }

    private fetch = async (request: IAuDatatableRequest): Promise<IAuDatatableResponse> => {
        const response = await this.userService.search(request);
        return {
            data: response.data,
            totalRecords: response.total
        } as IAuDatatableResponse;
    }
}

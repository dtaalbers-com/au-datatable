import { Router } from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { AuDatatableParameters } from 'au-datatable';
import { AuDatatableFilter } from 'au-datatable';
import { AuDatatableResponse } from 'au-datatable';

@autoinject()
export class ClientSideDemoPage {

    public data: Array<any>;
    public parameters: AuDatatableParameters = new AuDatatableParameters();
    public tableFilters: Array<AuDatatableFilter> =
    [
        {
            description: 'Contains',
            applyToColumns: [1, 3, 4, 5, 6]
        },
        {
            description: 'Greater Than',
            applyToColumns: [2]
        },
        {
            description: 'Smaller Than',
            applyToColumns: [2]
        },
        {
            description: 'Equals',
            applyToColumns: [1, 2, 3, 4, 5, 6]
        }
    ];

    public users: Array<any>;
    public isLoading: boolean = false;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    public async attached(): Promise<void> {
        this.isLoading = true;
        let response = await this.refresh(this.parameters);
        this.parameters.totalRecords = response.totalRecords;
        this.data = response.data;
        this.isLoading = false;
    }

    public refresh = async (parameters: AuDatatableParameters): Promise<AuDatatableResponse> => {
        this.isLoading = true;
        if (!this.users) this.users = await this.fetchData();
        var data = Object.assign([], this.users);
        data = await this.sortData(data, parameters.sortColumn, parameters.sortDirection);
        data = parameters.searchQuery ? await this.filterOnQueryString(data, parameters.searchQuery) : data;
        data = parameters.filters.length > 0 ? await this.filterOnFilters(data, parameters.filters) : data;
        this.isLoading = false;
        return Promise.resolve({
            totalRecords: data.length,
            data: data.slice(parameters.skip, parameters.skip + parameters.pageSize)
        } as AuDatatableResponse);
    }

    private async filterOnQueryString(data: Array<any>, query: string): Promise<Array<any>> {
        let filtered = data.filter(x => x.name.toLowerCase().includes(query.toLowerCase())
            || x.username.toLowerCase().includes(query.toLowerCase())
            || x.email.toLowerCase().includes(query.toLowerCase()));
        return Promise.resolve(filtered);
    }

    private async filterOnFilters(data: Array<any>, filters: Array<AuDatatableFilter>): Promise<Array<any>> {
        filters.forEach(filter => {
            switch (filter.description) {
                case 'Contains':
                    switch (filter.selectedColumn.toString()) {
                        case '1':
                            data = data.filter(x => x.name.includes(filter.value));
                            break;
                        case '3':
                            data = data.filter(x => x.username.includes(filter.value));
                            break;
                        case '4':
                            data = data.filter(x => x.email.includes(filter.value));
                            break;
                        default: throw new Error('[filter] Unknown selected column');
                    }
                    break;
                case 'Greater Than':
                    data = data.filter(x => x.age > filter.value);
                    break;
                case 'Smaller Than':
                    data = data.filter(x => x.age < filter.value);
                    break;
                case 'Equals':
                    switch (filter.selectedColumn.toString()) {
                        case '1':
                            data = data.filter(x => x.name == filter.value);
                            break;
                        case '2':
                            data = data.filter(x => x.age == filter.value);
                            break;
                        case '3':
                            data = data.filter(x => x.username == filter.value);
                            break;
                        case '4':
                            data = data.filter(x => x.email == filter.value);
                            break;
                        default: throw new Error('[filter] Unknown selected column');
                    }
                    break;
            }
        });
        return Promise.resolve(data);
    }

    private async sortData(data: Array<any>, column: number, direction: string): Promise<Array<any>> {
        let returnValue = [] as Array<any>;
        switch (column.toString()) {
            case '1':
                returnValue = this.sortArrayOnKey(data, direction, 'name');
                break;
            case '2':
                switch (direction) {
                    case 'ascending':
                        returnValue = data.sort((a, b) => a.age - b.age);
                        break;
                    case 'descending':
                        returnValue = data.sort((a, b) => b.age - a.age);
                    default: returnValue = data;
                        break;
                }
                break;
            case '3':
                returnValue = this.sortArrayOnKey(data, direction, 'username');
                break;
            case '4':
                returnValue = this.sortArrayOnKey(data, direction, 'email');
                break;
            default: returnValue = data;
        }
        return Promise.resolve(returnValue);
    }

    public openDemoPage(): void {
        this.router.navigateToRoute('client-side-demo');
    }

    public openHtmlPage(): void {
        this.router.navigateToRoute('client-side-html');
    }

    public openTypescriptPage(): void {
        this.router.navigateToRoute('client-side-typescript');
    }

    public openSassPage(): void {
        this.router.navigateToRoute('client-side-sass');
    }

    public backToIntro(): void {
        this.router.navigateToRoute('intro');
    }

    private async fetchData(): Promise<any> {
        return await this.http.fetch('https://api.dtaalbers.com/au-datatable/datatable')
            .then(x => x.json());
    }

    private sortArrayOnKey(array: Array<any>, direction: string, key: string): Array<any> {
        if (!direction) return array;
        let sorted = array.sort((a, b) => {
            if (a[key] < b[key])
                return -1;
            if (a[key] > b[key])
                return 1;
            return 0;
        });
        return direction == 'ascending' ? sorted : sorted.reverse();
    }
}


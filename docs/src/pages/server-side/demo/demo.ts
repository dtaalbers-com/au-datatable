import { Router } from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { AuDatatableParameters } from 'au-datatable';
import { AuDatatableFilter } from 'au-datatable';
import { AuDatatableResponse } from 'au-datatable';

@autoinject()
export class ServerSideDemoPage {

    public data: Array<any>;
    public parameters: AuDatatableParameters = new AuDatatableParameters();
    public tableFilters: Array<AuDatatableFilter> =
    [
        {
            description: 'Contains',
            applyToColumns: [1, 3, 4]
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
            applyToColumns: [1, 2, 3, 4]
        }
    ];

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    public openDemoPage(): void {
        this.router.navigateToRoute('server-side-demo');
    }

    public openHtmlPage(): void {
        this.router.navigateToRoute('server-side-html');
    }

    public openTypescriptPage(): void {
        this.router.navigateToRoute('server-side-typescript');
    }

    public openSassPage(): void {
        this.router.navigateToRoute('server-side-sass');
    }

    public backToIntro(): void {
        this.router.navigateToRoute('intro');
    }

    public async attached(): Promise<void> {
        let response = await this.refresh(this.parameters);
        // Hack when api refuses to load data when 
        // api receives first request after restart
        if (response.totalRecords == 0) location.reload();
        this.data = response.data;
        this.parameters.totalRecords = response.totalRecords;
    }

    private refresh = async (parameters: AuDatatableParameters): Promise<AuDatatableResponse> => {
        let direction = parameters.sortDirection == undefined
            ? undefined
            : parameters.sortDirection == 'ascending' ? 0 : 1;
        let filters = parameters.filters.map(x => {
            return {
                value: x.value,
                column: x.selectedColumn,
                description: this.descriptionToEnum(x.description)
            };
        });
        let response = await this.http.fetch('https://api.dtaalbers.com/au-datatable/datatable', {
            method: 'POST',
            body: json({
                skip: parameters.skip,
                page_size: parameters.pageSize,
                search_query: parameters.searchQuery,
                sort_column: parameters.sortColumn,
                sort_direction: direction,
                filters: filters
            })
        })
        let mapped = await response.json();
        return {
            data: mapped.data,
            totalRecords: mapped.total_records
        } as AuDatatableResponse;
    }


    private descriptionToEnum(description: string): number {
        switch (description) {
            case 'Greater Than': return 0;
            case 'Smaller Than': return 1;
            case 'Equals': return 2;
            case 'Contains': return 3;
            default: return undefined;
        }
    }
}
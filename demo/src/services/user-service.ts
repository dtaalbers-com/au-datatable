import { IAuDatatableRequest } from 'au-datatable';
import { HttpClient } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { IUser } from 'models/user';
import { IPagedList } from '../models/paged-list';

@autoinject()
export class UserService {

    private endpoint: string = 'https://api.dtaalbers.com/au-datatable/users/';

    constructor(
        private client: HttpClient
    ) { }

    public async search(request: IAuDatatableRequest): Promise<IPagedList<IUser>> {
        let url = `${this.endpoint}search?skip=${request.skip}&take=${request.pageSize}`;

        if (request.filters)
            for (let index = 0; index < request.filters.length; index++) {
                url += `&filters[${index}].value=${request.filters[index].value}`;
                url += `&filters[${index}].selectedColumn=${request.filters[index].selectedColumn}`;
                url += `&filters[${index}].description=${request.filters[index].description}`;
            }

        if (request.searchQuery) url += `&q=${request.searchQuery}`;
        if (request.sortBy) url += `&sortBy=${request.sortBy}`;
        if (request.sortDirection) url += `&sortDirection=${request.sortDirection}`;

        const response = await this.client.fetch(url);
        const mapped = await response.json();
        return {
            data: mapped.data.map((x) => this.parse(x)),
            total: mapped.total
        };
    }

    private parse(raw: any): IUser {
        return {
            id: raw.id,
            name: raw.name,
            street: raw.street,
            postcode: raw.postcode,
            state: raw.state,
            city: raw.city,
            username: raw.username,
            thumbnail: raw.thumbnail,
            nat: raw.nat,
            age: raw.age,
            email: raw.email
        } as IUser;
    }
}
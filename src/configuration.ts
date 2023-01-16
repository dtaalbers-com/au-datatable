import { DI, IContainer, IRegistry } from '@aurelia/kernel';
import { AuDatatableAttribute } from './attributes/datatable';
import { AuDatatableSortAttribute } from './attributes/sort';
import { AuDatatableFilterComponent } from './components/filter/filter';
import { AuDatatableInfoComponent } from './components/info/info';
import { AuDatatablePagesizeComponent } from './components/pagesize/pagesize';
import { AuDatatablePaginationComponent } from './components/pagination/pagination';
import { AuDatatableSearchComponent } from './components/search/search';
import { AuDatatableFilter } from './models/filter';
import { AuDatatableRequest } from './models/request';
import { AuDatatableResponse } from './models/response';

export const DefaultComponents: IRegistry[] = [
    AuDatatableAttribute as unknown as IRegistry,
    AuDatatableSortAttribute as unknown as IRegistry,
    AuDatatableFilterComponent as unknown as IRegistry,
    AuDatatableInfoComponent as unknown as IRegistry,
    AuDatatablePagesizeComponent as unknown as IRegistry,
    AuDatatablePaginationComponent as unknown as IRegistry,
    AuDatatableSearchComponent as unknown as IRegistry,
    AuDatatableFilter as unknown as IRegistry,
    AuDatatableRequest as unknown as IRegistry,
    AuDatatableResponse as unknown as IRegistry
];

const datatableConfiguration = {
    register(container: IContainer): IContainer {
        return container.register(...DefaultComponents);
    },

    createContainer(): IContainer {
        return this.register(DI.createContainer());
    }
};

export const AuDatatableConfiguration = {
    customize(components: any[] = []) {
        return { ...datatableConfiguration };
    },
    ...datatableConfiguration
};

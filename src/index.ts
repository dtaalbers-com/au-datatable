import { FrameworkConfiguration } from 'aurelia-framework';
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

export {
    AuDatatableAttribute,
    AuDatatablePaginationComponent,
    AuDatatableInfoComponent,
    AuDatatablePagesizeComponent,
    AuDatatableSearchComponent,
    AuDatatableSortAttribute,
    AuDatatableFilterComponent,
    AuDatatableResponse,
    AuDatatableRequest,
    AuDatatableFilter
};

export function configure(config: FrameworkConfiguration): void {
    config.globalResources([
        AuDatatableAttribute,
        AuDatatableSortAttribute,
        AuDatatablePaginationComponent,
        AuDatatableSearchComponent,
        AuDatatablePagesizeComponent,
        AuDatatableFilterComponent,
        AuDatatableInfoComponent
    ]);
}

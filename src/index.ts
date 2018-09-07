import { PLATFORM } from 'aurelia-framework';
import { AuDatatableAttribute } from './attributes/datatable';
import { AuDatatableSortAttribute } from './attributes/sort';
import { AuDatatableFilterComponent } from './components/filter/filter';
import { AuDatatableInfoComponent } from './components/info/info';
import { AuDatatablePagesizeComponent } from './components/pagesize/pagesize';
import { AuDatatablePaginationComponent } from './components/pagination/pagination';
import { AuDatatableSearchComponent } from './components/search/search';
import { IAuDatatableFilter } from './models/filter';
import { IAuDatatableRequest } from './models/request';
import { IAuDatatableResponse } from './models/response';

export function configure(config: any) {
    config.globalResources(PLATFORM.moduleName('./packages/datatable'));
    config.globalResources(PLATFORM.moduleName('./packages/pagination'));
    config.globalResources(PLATFORM.moduleName('./packages/search'));
    config.globalResources(PLATFORM.moduleName('./packages/pagesize'));
    config.globalResources(PLATFORM.moduleName('./packages/info'));
    config.globalResources(PLATFORM.moduleName('./packages/sort'));
    config.globalResources(PLATFORM.moduleName('./packages/filter'));
}

export { AuDatatableAttribute, AuDatatablePaginationComponent, AuDatatableInfoComponent, AuDatatablePagesizeComponent, AuDatatableSearchComponent, AuDatatableSortAttribute, AuDatatableFilterComponent, IAuDatatableFilter, IAuDatatableRequest, IAuDatatableResponse };


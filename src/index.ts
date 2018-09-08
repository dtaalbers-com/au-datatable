import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import AuDatatableAttribute from './attributes/datatable';
import AuDatatableSortAttribute from './attributes/sort';
import AuDatatableFilterComponent from './components/filter/filter';
import AuDatatableInfoComponent from './components/info/info';
import AuDatatablePagesizeComponent from './components/pagesize/pagesize';
import AuDatatablePaginationComponent from './components/pagination/pagination';
import AuDatatableSearchComponent from './components/search/search';
import IAuDatatableFilter from './models/filter';
import IAuDatatableRequest from './models/request';
import IAuDatatableResponse from './models/response';

export { AuDatatableAttribute, AuDatatablePaginationComponent, AuDatatableInfoComponent, AuDatatablePagesizeComponent, AuDatatableSearchComponent, AuDatatableSortAttribute, AuDatatableFilterComponent, IAuDatatableFilter, IAuDatatableRequest, IAuDatatableResponse };

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./attributes/datatable'),
        PLATFORM.moduleName('./attributes/sort'),
        PLATFORM.moduleName('./components/pagination/pagination'),
        PLATFORM.moduleName('./components/search/search'),
        PLATFORM.moduleName('./components/pagesize/pagesize'),
        PLATFORM.moduleName('./components/info/info')
    ]);
}

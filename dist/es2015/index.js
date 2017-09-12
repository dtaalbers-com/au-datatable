import { PLATFORM } from 'aurelia-pal';
import { AuDatatablePagesizeComponent } from './au-datatable-pagesize';
import { AuDatatablePaginationComponent } from './au-datatable-pagination';
import { AuDatatableCustomAttribute } from './au-datatable';
import { AuDatatableInfoComponent } from './au-datatable-info';
import { AuDatatableSearchComponent } from './au-datatable-search';
import { AuDatatableSortCustomAttribute } from './au-datatable-sort';
import { AuDatatableFilterComponent } from './au-datatable-filter';
export function configure(config) {
    config.globalResources(PLATFORM.moduleName('./au-datatable'));
    config.globalResources(PLATFORM.moduleName('./au-datatable-pagination'));
    config.globalResources(PLATFORM.moduleName('./au-datatable-search'));
    config.globalResources(PLATFORM.moduleName('./au-datatable-pagesize'));
    config.globalResources(PLATFORM.moduleName('./au-datatable-info'));
    config.globalResources(PLATFORM.moduleName('./au-datatable-sort'));
    config.globalResources(PLATFORM.moduleName('./au-datatable-filter'));
}
export { AuDatatableCustomAttribute, AuDatatablePaginationComponent, AuDatatableInfoComponent, AuDatatablePagesizeComponent, AuDatatableSearchComponent, AuDatatableSortCustomAttribute, AuDatatableFilterComponent };

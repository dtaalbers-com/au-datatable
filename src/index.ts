import { FrameworkConfiguration } from 'aurelia-framework';
export function configure(aurelia: FrameworkConfiguration) {
    aurelia.globalResources([
        './au-table',
        './au-table-pagination/au-table-pagination',
        './au-table-search/au-table-search',
        './au-table-pagesize/au-table-pagesize',
        './au-table-info/au-table-info',
        './au-table-sort/au-table-sort',
        './au-table-filter/au-table-filter'
    ]);
}

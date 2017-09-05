import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(
    config: FrameworkConfiguration
) {
    config.globalResources([
        '../components/au-table/au-table',
        '../components/au-table/au-table-pagination/au-table-pagination',
        '../components/au-table/au-table-search/au-table-search',
        '../components/au-table/au-table-pagesize/au-table-pagesize',
        '../components/au-table/au-table-info/au-table-info',
        '../components/au-table/au-table-sort/au-table-sort'
    ]);
}

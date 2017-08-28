import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(
    config: FrameworkConfiguration
) {
    config.globalResources([
        '../components/au-table/au-table',
        '../components/au-table/au-table-pagination/au-table-pagination',
        '../components/au-table/au-table-header/au-table-header',
        '../components/au-table/au-table-search/au-table-search'
    ]);
}

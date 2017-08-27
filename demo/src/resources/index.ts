import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(
    config: FrameworkConfiguration
) {
    config.globalResources([
        '../components/au-table/au-table',
        '../components/au-table/au-table-pagination'
    ]);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function configure(aurelia) {
    aurelia.globalResources([
        './au-datatable',
        './au-datatable-pagination/au-datatable-pagination',
        './au-datatable-search/au-datatable-search',
        './au-datatable-pagesize/au-datatable-pagesize',
        './au-datatable-info/au-datatable-info',
        './au-datatable-sort/au-datatable-sort',
        './au-datatable-filter/au-datatable-filter',
        './au-datatable-contracts/AuDatatableFilter',
        './au-datatable-contracts/AuDatatableParameters',
        './au-datatable-contracts/AuDatatableResponse'
    ]);
}
exports.configure = configure;

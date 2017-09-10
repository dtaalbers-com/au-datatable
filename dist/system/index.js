System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    exports_1("configure", configure);
    return {
        setters: [],
        execute: function () {
        }
    };
});

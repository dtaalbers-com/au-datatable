System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(aurelia) {
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
    exports_1("configure", configure);
    return {
        setters: [],
        execute: function () {
        }
    };
});

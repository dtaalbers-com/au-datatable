define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.configure = configure;
});

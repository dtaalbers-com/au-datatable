System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AuDatatableParameters;
    return {
        setters: [],
        execute: function () {
            AuDatatableParameters = /** @class */ (function () {
                function AuDatatableParameters() {
                    this.skip = 0;
                    this.pageSize = 10;
                    this.sortDirection = 'ascending';
                    this.sortColumn = 0;
                    this.filters = [];
                }
                return AuDatatableParameters;
            }());
            exports_1("AuDatatableParameters", AuDatatableParameters);
        }
    };
});

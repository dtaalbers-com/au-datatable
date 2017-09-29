define(["require", "exports", "aurelia-pal", "./au-datatable-pagesize", "./au-datatable-pagination", "./au-datatable", "./au-datatable-info", "./au-datatable-search", "./au-datatable-sort", "./au-datatable-filter", "./AuDatatableFilter", "./AuDatatableParameters", "./AuDatatableResponse"], function (require, exports, aurelia_pal_1, au_datatable_pagesize_1, au_datatable_pagination_1, au_datatable_1, au_datatable_info_1, au_datatable_search_1, au_datatable_sort_1, au_datatable_filter_1, AuDatatableFilter_1, AuDatatableParameters_1, AuDatatableResponse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuDatatablePagesizeComponent = au_datatable_pagesize_1.AuDatatablePagesizeComponent;
    exports.AuDatatablePaginationComponent = au_datatable_pagination_1.AuDatatablePaginationComponent;
    exports.AuDatatableCustomAttribute = au_datatable_1.AuDatatableCustomAttribute;
    exports.AuDatatableInfoComponent = au_datatable_info_1.AuDatatableInfoComponent;
    exports.AuDatatableSearchComponent = au_datatable_search_1.AuDatatableSearchComponent;
    exports.AuDatatableSortCustomAttribute = au_datatable_sort_1.AuDatatableSortCustomAttribute;
    exports.AuDatatableFilterComponent = au_datatable_filter_1.AuDatatableFilterComponent;
    exports.AuDatatableFilter = AuDatatableFilter_1.AuDatatableFilter;
    exports.AuDatatableParameters = AuDatatableParameters_1.AuDatatableParameters;
    exports.AuDatatableResponse = AuDatatableResponse_1.AuDatatableResponse;
    function configure(config) {
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-pagination'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-search'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-pagesize'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-info'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-sort'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-filter'));
    }
    exports.configure = configure;
});

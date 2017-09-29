System.register(["aurelia-pal", "./au-datatable-pagesize", "./au-datatable-pagination", "./au-datatable", "./au-datatable-info", "./au-datatable-search", "./au-datatable-sort", "./au-datatable-filter", "./AuDatatableFilter", "./AuDatatableParameters", "./AuDatatableResponse"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-pagination'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-search'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-pagesize'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-info'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-sort'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./au-datatable-filter'));
    }
    exports_1("configure", configure);
    var aurelia_pal_1, au_datatable_pagesize_1, au_datatable_pagination_1, au_datatable_1, au_datatable_info_1, au_datatable_search_1, au_datatable_sort_1, au_datatable_filter_1, AuDatatableFilter_1, AuDatatableParameters_1, AuDatatableResponse_1;
    return {
        setters: [
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (au_datatable_pagesize_1_1) {
                au_datatable_pagesize_1 = au_datatable_pagesize_1_1;
            },
            function (au_datatable_pagination_1_1) {
                au_datatable_pagination_1 = au_datatable_pagination_1_1;
            },
            function (au_datatable_1_1) {
                au_datatable_1 = au_datatable_1_1;
            },
            function (au_datatable_info_1_1) {
                au_datatable_info_1 = au_datatable_info_1_1;
            },
            function (au_datatable_search_1_1) {
                au_datatable_search_1 = au_datatable_search_1_1;
            },
            function (au_datatable_sort_1_1) {
                au_datatable_sort_1 = au_datatable_sort_1_1;
            },
            function (au_datatable_filter_1_1) {
                au_datatable_filter_1 = au_datatable_filter_1_1;
            },
            function (AuDatatableFilter_1_1) {
                AuDatatableFilter_1 = AuDatatableFilter_1_1;
            },
            function (AuDatatableParameters_1_1) {
                AuDatatableParameters_1 = AuDatatableParameters_1_1;
            },
            function (AuDatatableResponse_1_1) {
                AuDatatableResponse_1 = AuDatatableResponse_1_1;
            }
        ],
        execute: function () {
            exports_1("AuDatatablePagesizeComponent", au_datatable_pagesize_1.AuDatatablePagesizeComponent);
            exports_1("AuDatatablePaginationComponent", au_datatable_pagination_1.AuDatatablePaginationComponent);
            exports_1("AuDatatableCustomAttribute", au_datatable_1.AuDatatableCustomAttribute);
            exports_1("AuDatatableInfoComponent", au_datatable_info_1.AuDatatableInfoComponent);
            exports_1("AuDatatableSearchComponent", au_datatable_search_1.AuDatatableSearchComponent);
            exports_1("AuDatatableSortCustomAttribute", au_datatable_sort_1.AuDatatableSortCustomAttribute);
            exports_1("AuDatatableFilterComponent", au_datatable_filter_1.AuDatatableFilterComponent);
            exports_1("AuDatatableFilter", AuDatatableFilter_1.AuDatatableFilter);
            exports_1("AuDatatableParameters", AuDatatableParameters_1.AuDatatableParameters);
            exports_1("AuDatatableResponse", AuDatatableResponse_1.AuDatatableResponse);
        }
    };
});

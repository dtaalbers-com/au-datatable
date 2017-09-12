"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_pal_1 = require("aurelia-pal");
var au_datatable_pagesize_1 = require("./au-datatable-pagesize");
exports.AuDatatablePagesizeComponent = au_datatable_pagesize_1.AuDatatablePagesizeComponent;
var au_datatable_pagination_1 = require("./au-datatable-pagination");
exports.AuDatatablePaginationComponent = au_datatable_pagination_1.AuDatatablePaginationComponent;
var au_datatable_1 = require("./au-datatable");
exports.AuDatatableCustomAttribute = au_datatable_1.AuDatatableCustomAttribute;
var au_datatable_info_1 = require("./au-datatable-info");
exports.AuDatatableInfoComponent = au_datatable_info_1.AuDatatableInfoComponent;
var au_datatable_search_1 = require("./au-datatable-search");
exports.AuDatatableSearchComponent = au_datatable_search_1.AuDatatableSearchComponent;
var au_datatable_sort_1 = require("./au-datatable-sort");
exports.AuDatatableSortCustomAttribute = au_datatable_sort_1.AuDatatableSortCustomAttribute;
var au_datatable_filter_1 = require("./au-datatable-filter");
exports.AuDatatableFilterComponent = au_datatable_filter_1.AuDatatableFilterComponent;
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

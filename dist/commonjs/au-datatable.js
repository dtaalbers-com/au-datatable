"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var AuDatatableCustomAttribute = /** @class */ (function () {
    function AuDatatableCustomAttribute() {
    }
    AuDatatableCustomAttribute.prototype.setData = function () {
        if (this.startingData.length > this.parameters.pageSize)
            throw new Error('[au-table:bind] starting data is larger than page size.');
        this.parameters.tableData = [].concat(this.startingData);
        this.parameters.currentPage = 1;
        this.parameters.skip = 0;
    };
    AuDatatableCustomAttribute.prototype.updateCurrentPage = function () {
        this.parameters.currentPage = this.parameters.totalRecords > 0 ? 1 : 0;
    };
    __decorate([
        aurelia_framework_1.bindable({
            changeHandler: 'setData'
        })
    ], AuDatatableCustomAttribute.prototype, "startingData", void 0);
    __decorate([
        aurelia_framework_1.bindable({
            defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
            changeHandler: 'updateCurrentPage'
        })
    ], AuDatatableCustomAttribute.prototype, "parameters", void 0);
    AuDatatableCustomAttribute = __decorate([
        aurelia_framework_1.customAttribute('au-datatable')
    ], AuDatatableCustomAttribute);
    return AuDatatableCustomAttribute;
}());
exports.AuDatatableCustomAttribute = AuDatatableCustomAttribute;

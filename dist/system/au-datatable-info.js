System.register(["aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, AuDatatableInfoComponent;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            AuDatatableInfoComponent = /** @class */ (function () {
                function AuDatatableInfoComponent(bindingEngine) {
                    this.bindingEngine = bindingEngine;
                    this.subscriptions = [];
                }
                AuDatatableInfoComponent.prototype.attached = function () {
                    var _this = this;
                    if (!this.message)
                        this.message = 'START_RECORD to END_RECORD of total TOTAL_RECORDS records';
                    if (!this.labelFiltered)
                        this.labelFiltered = 'filtered';
                    this.subscriptions.push(this.bindingEngine
                        .propertyObserver(this.parameters, 'tableData')
                        .subscribe(function () { return _this.updateRecordInfo(); }));
                    this.subscriptions.push(this.bindingEngine
                        .propertyObserver(this.parameters, 'pageSize')
                        .subscribe(function () { return _this.reset(); }));
                };
                AuDatatableInfoComponent.prototype.detached = function () {
                    this.subscriptions.forEach(function (x) { return x.dispose(); });
                };
                AuDatatableInfoComponent.prototype.updateRecordInfo = function () {
                    if (!this.startRecord && !this.endRecord) {
                        this.startRecord = 1;
                        this.endRecord = this.parameters.pageSize;
                    }
                    else {
                        if (this.currentPageCopy + 1 == this.parameters.currentPage) {
                            this.nextPage();
                        }
                        else if (this.currentPageCopy - 1 == this.parameters.currentPage) {
                            this.previousPage();
                        }
                        else {
                            this.pageChanged();
                        }
                    }
                    this.currentPageCopy = this.parameters.currentPage;
                    this.translateInfo();
                };
                AuDatatableInfoComponent.prototype.translateInfo = function () {
                    if (this.parameters.totalRecords == undefined
                        || this.parameters.pageSize == undefined
                        || this.startRecord == undefined
                        || this.endRecord == undefined)
                        return;
                    this.info = this.message
                        .replace('START_RECORD', this.parameters.tableData.length == 0
                        ? '0'
                        : this.startRecord.toString())
                        .replace('END_RECORD', this.parameters.tableData.length < this.parameters.pageSize
                        ? this.parameters.totalRecords.toString()
                        : (this.parameters.tableData.length * this.parameters.currentPage).toString())
                        .replace('TOTAL_RECORDS', this.parameters.totalRecords.toString());
                };
                AuDatatableInfoComponent.prototype.nextPage = function () {
                    this.startRecord += this.parameters.pageSize;
                    this.endRecord = (this.endRecord + this.parameters.pageSize) > this.parameters.totalRecords
                        ? this.parameters.totalRecords
                        : this.endRecord + this.parameters.pageSize;
                };
                AuDatatableInfoComponent.prototype.previousPage = function () {
                    this.startRecord -= this.parameters.pageSize;
                    this.endRecord = this.parameters.pageSize * this.parameters.currentPage;
                };
                AuDatatableInfoComponent.prototype.pageChanged = function () {
                    var page = this.parameters.currentPage - 1;
                    this.startRecord = (page * this.parameters.pageSize) + 1;
                    var next = (page + 1) * this.parameters.pageSize;
                    this.endRecord = next > this.parameters.totalRecords ? this.parameters.totalRecords : next;
                };
                AuDatatableInfoComponent.prototype.reset = function () {
                    this.parameters.currentPage = 1;
                    this.currentPageCopy = 1;
                };
                __decorate([
                    aurelia_framework_1.bindable
                ], AuDatatableInfoComponent.prototype, "message", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AuDatatableInfoComponent.prototype, "labelFiltered", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AuDatatableInfoComponent.prototype, "parameters", void 0);
                AuDatatableInfoComponent = __decorate([
                    aurelia_framework_1.customElement('au-datatable-info'),
                    aurelia_framework_1.inject(aurelia_framework_1.BindingEngine),
                    aurelia_framework_1.inlineView("\n    <template>\n        <div class=\"au-table-info\">\n            ${ info } \n            <span if.bind=\"parameters.searchQuery.length > 0 && parameters.tableData.length > 0\">&nbsp;(${ labelFiltered })</span>\n        </div>\n    </template>\n")
                ], AuDatatableInfoComponent);
                return AuDatatableInfoComponent;
            }());
            exports_1("AuDatatableInfoComponent", AuDatatableInfoComponent);
        }
    };
});

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var AuTableInfo = /** @class */ (function () {
    function AuTableInfo(binding_engine) {
        this.binding_engine = binding_engine;
        this.subscriptions = [];
    }
    AuTableInfo.prototype.attached = function () {
        var _this = this;
        if (!this.message)
            this.message = 'START_RECORD to END_RECORD of total TOTAL_RECORDS records';
        if (!this.label_filtered)
            this.label_filtered = 'filtered';
        this.subscriptions.push(this.binding_engine
            .propertyObserver(this.parameters, 'table_data')
            .subscribe(function () { return _this.update_record_info(); }));
        this.subscriptions.push(this.binding_engine
            .propertyObserver(this.parameters, 'page_size')
            .subscribe(function () { return _this.reset(); }));
    };
    AuTableInfo.prototype.detached = function () {
        this.subscriptions.forEach(function (x) { return x.dispose(); });
    };
    AuTableInfo.prototype.update_record_info = function () {
        if (!this.start_record && !this.end_record) {
            this.start_record = 1;
            this.end_record = this.parameters.page_size;
        }
        else {
            if (this.current_page_copy + 1 == this.parameters.current_page) {
                this.next_page();
            }
            else if (this.current_page_copy - 1 == this.parameters.current_page) {
                this.previous_page();
            }
            else {
                this.page_changed();
            }
        }
        this.current_page_copy = this.parameters.current_page;
        this.translate_info();
    };
    AuTableInfo.prototype.translate_info = function () {
        if (this.parameters.total_records == undefined
            || this.parameters.page_size == undefined
            || this.start_record == undefined
            || this.end_record == undefined)
            return;
        this.info = this.message
            .replace('START_RECORD', this.parameters.table_data.length == 0
            ? '0'
            : this.start_record.toString())
            .replace('END_RECORD', this.parameters.table_data.length < this.parameters.page_size
            ? this.parameters.total_records.toString()
            : (this.parameters.table_data.length * this.parameters.current_page).toString())
            .replace('TOTAL_RECORDS', this.parameters.total_records.toString());
    };
    AuTableInfo.prototype.next_page = function () {
        this.start_record += this.parameters.page_size;
        this.end_record = (this.end_record + this.parameters.page_size) > this.parameters.total_records
            ? this.parameters.total_records
            : this.end_record + this.parameters.page_size;
    };
    AuTableInfo.prototype.previous_page = function () {
        this.start_record -= this.parameters.page_size;
        this.end_record = this.parameters.page_size * this.parameters.current_page;
    };
    AuTableInfo.prototype.page_changed = function () {
        var page = this.parameters.current_page - 1;
        this.start_record = (page * this.parameters.page_size) + 1;
        var next = (page + 1) * this.parameters.page_size;
        this.end_record = next > this.parameters.total_records ? this.parameters.total_records : next;
    };
    AuTableInfo.prototype.reset = function () {
        this.parameters.current_page = 1;
        this.current_page_copy = 1;
    };
    __decorate([
        aurelia_framework_1.bindable
    ], AuTableInfo.prototype, "message", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AuTableInfo.prototype, "label_filtered", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AuTableInfo.prototype, "parameters", void 0);
    AuTableInfo = __decorate([
        aurelia_framework_1.customElement('au-table-info')
    ], AuTableInfo);
    return AuTableInfo;
}());
exports.AuTableInfo = AuTableInfo;

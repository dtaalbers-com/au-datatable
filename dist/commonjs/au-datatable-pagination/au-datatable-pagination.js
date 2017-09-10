"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var AuDatatablePaginationComponent = /** @class */ (function () {
    function AuDatatablePaginationComponent(binding_engine) {
        this.binding_engine = binding_engine;
        this.amount_of_pages = 2;
        this.refreshing = false;
        this.subscriptions = [];
    }
    AuDatatablePaginationComponent.prototype.attached = function () {
        var _this = this;
        this.subscriptions.push(this.binding_engine
            .propertyObserver(this.parameters, 'current_page')
            .subscribe(function () { return _this.data_change(); }));
        this.subscriptions.push(this.binding_engine
            .propertyObserver(this.parameters, 'total_records')
            .subscribe(function () { return _this.data_change(); }));
        this.subscriptions.push(this.binding_engine
            .propertyObserver(this.parameters, 'page_size')
            .subscribe(function () { return _this.data_change(); }));
    };
    AuDatatablePaginationComponent.prototype.data_change = function () {
        if (this.parameters.current_page == undefined || this.parameters.total_records == undefined)
            return;
        this.refreshing = true;
        this.total_pages = Math.ceil(parseInt(this.parameters.total_records.toString()) / this.parameters.page_size);
        this.previous_pages = this.parameters.current_page - this.amount_of_pages <= 0
            ? this.parameters.current_page - 1
            : this.amount_of_pages;
        this.following_pages = this.parameters.current_page + this.amount_of_pages > this.total_pages
            ? this.parameters.current_page == this.total_pages ? 0 : this.total_pages - this.parameters.current_page
            : this.amount_of_pages;
        this.refreshing = false;
    };
    AuDatatablePaginationComponent.prototype.next_page = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof this.on_next_page != 'function')
                            throw new Error('[au-table-pagination:next_page] No on_next_page() callback has been set');
                        if (this.parameters.current_page == this.total_pages)
                            return [2 /*return*/];
                        this.refreshing = true;
                        this.parameters.skip += this.parameters.page_size;
                        this.parameters.current_page++;
                        return [4 /*yield*/, this.on_next_page(this.parameters)];
                    case 1:
                        response = _a.sent();
                        this.parameters.total_records = response.total_records;
                        this.parameters.table_data = response.data;
                        this.refreshing = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    AuDatatablePaginationComponent.prototype.previous_page = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof this.on_previous_page != 'function')
                            throw new Error('[au-table-pagination:previous_page] No on_previous_page() callback has been set');
                        if (this.parameters.current_page == 1)
                            return [2 /*return*/];
                        this.refreshing = true;
                        this.parameters.skip -= this.parameters.page_size;
                        this.parameters.current_page--;
                        return [4 /*yield*/, this.on_next_page(this.parameters)];
                    case 1:
                        response = _a.sent();
                        this.parameters.total_records = response.total_records;
                        this.parameters.table_data = response.data;
                        this.refreshing = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    AuDatatablePaginationComponent.prototype.change_page = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof this.on_page_change != 'function')
                            throw new Error('[au-table-pagination:change_page] No on_page_change() callback has been set');
                        if (page + 1 == this.parameters.current_page)
                            return [2 /*return*/];
                        this.refreshing = true;
                        if (page < 0)
                            page = 0;
                        this.parameters.skip = page * this.parameters.page_size;
                        this.parameters.current_page = page + 1;
                        return [4 /*yield*/, this.on_next_page(this.parameters)];
                    case 1:
                        response = _a.sent();
                        this.parameters.total_records = response.total_records;
                        this.parameters.table_data = response.data;
                        this.refreshing = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    AuDatatablePaginationComponent.prototype.calculate_previous_page_number = function (index) {
        var number = (this.parameters.current_page + index) - this.amount_of_pages;
        return number == 0 ? 1 : number;
    };
    AuDatatablePaginationComponent.prototype.detached = function () {
        this.subscriptions.forEach(function (x) { return x.dispose(); });
    };
    __decorate([
        aurelia_framework_1.bindable
    ], AuDatatablePaginationComponent.prototype, "amount_of_pages", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AuDatatablePaginationComponent.prototype, "on_next_page", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AuDatatablePaginationComponent.prototype, "on_previous_page", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AuDatatablePaginationComponent.prototype, "on_page_change", void 0);
    __decorate([
        aurelia_framework_1.bindable({
            defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
        })
    ], AuDatatablePaginationComponent.prototype, "parameters", void 0);
    AuDatatablePaginationComponent = __decorate([
        aurelia_framework_1.customElement('au-datatable-pagination'),
        aurelia_framework_1.inject(aurelia_framework_1.BindingEngine)
    ], AuDatatablePaginationComponent);
    return AuDatatablePaginationComponent;
}());
exports.AuDatatablePaginationComponent = AuDatatablePaginationComponent;

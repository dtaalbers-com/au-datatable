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
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuDatatablePaginationComponent = /** @class */ (function () {
        function AuDatatablePaginationComponent(bindingEngine) {
            this.bindingEngine = bindingEngine;
            this.amountOfPages = 2;
            this.refreshing = false;
            this.subscriptions = [];
        }
        AuDatatablePaginationComponent.prototype.attached = function () {
            var _this = this;
            this.subscriptions.push(this.bindingEngine
                .propertyObserver(this.parameters, 'currentPage')
                .subscribe(function () { return _this.dataChange(); }));
            this.subscriptions.push(this.bindingEngine
                .propertyObserver(this.parameters, 'totalRecords')
                .subscribe(function () { return _this.dataChange(); }));
            this.subscriptions.push(this.bindingEngine
                .propertyObserver(this.parameters, 'pageSize')
                .subscribe(function () { return _this.dataChange(); }));
        };
        AuDatatablePaginationComponent.prototype.dataChange = function () {
            if (this.parameters.currentPage == undefined || this.parameters.totalRecords == undefined)
                return;
            this.refreshing = true;
            this.totalPages = Math.ceil(parseInt(this.parameters.totalRecords.toString()) / this.parameters.pageSize);
            this.previousPages = this.parameters.currentPage - this.amountOfPages <= 0
                ? this.parameters.currentPage - 1
                : this.amountOfPages;
            this.followingPages = this.parameters.currentPage + this.amountOfPages > this.totalPages
                ? this.parameters.currentPage == this.totalPages ? 0 : this.totalPages - this.parameters.currentPage
                : this.amountOfPages;
            this.refreshing = false;
        };
        AuDatatablePaginationComponent.prototype.nextPage = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof this.onNextPage != 'function')
                                throw new Error('[au-table-pagination:nextPage] No onNextPage() callback has been set');
                            if (this.parameters.currentPage == this.totalPages)
                                return [2 /*return*/];
                            this.refreshing = true;
                            this.parameters.skip += this.parameters.pageSize;
                            this.parameters.currentPage++;
                            return [4 /*yield*/, this.onNextPage(this.parameters)];
                        case 1:
                            response = _a.sent();
                            this.parameters.totalRecords = response.totalRecords;
                            this.parameters.tableData = response.data;
                            this.refreshing = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuDatatablePaginationComponent.prototype.previousPage = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof this.onPreviousPage != 'function')
                                throw new Error('[au-table-pagination:previousPage] No onPreviousPage() callback has been set');
                            if (this.parameters.currentPage == 1)
                                return [2 /*return*/];
                            this.refreshing = true;
                            this.parameters.skip -= this.parameters.pageSize;
                            this.parameters.currentPage--;
                            return [4 /*yield*/, this.onPreviousPage(this.parameters)];
                        case 1:
                            response = _a.sent();
                            this.parameters.totalRecords = response.totalRecords;
                            this.parameters.tableData = response.data;
                            this.refreshing = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuDatatablePaginationComponent.prototype.changePage = function (page) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof this.onPageChange != 'function')
                                throw new Error('[au-table-pagination:changePage] No onChangePage() callback has been set');
                            if (page + 1 == this.parameters.currentPage)
                                return [2 /*return*/];
                            this.refreshing = true;
                            if (page < 0)
                                page = 0;
                            this.parameters.skip = page * this.parameters.pageSize;
                            this.parameters.currentPage = page + 1;
                            return [4 /*yield*/, this.onPageChange(this.parameters)];
                        case 1:
                            response = _a.sent();
                            this.parameters.totalRecords = response.totalRecords;
                            this.parameters.tableData = response.data;
                            this.refreshing = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuDatatablePaginationComponent.prototype.calculatePreviousPageNumber = function (index) {
            var number = (this.parameters.currentPage + index) - this.amountOfPages;
            return number == 0 ? 1 : number;
        };
        AuDatatablePaginationComponent.prototype.detached = function () {
            this.subscriptions.forEach(function (x) { return x.dispose(); });
        };
        __decorate([
            aurelia_framework_1.bindable
        ], AuDatatablePaginationComponent.prototype, "amountOfPages", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], AuDatatablePaginationComponent.prototype, "onNextPage", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], AuDatatablePaginationComponent.prototype, "onPreviousPage", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], AuDatatablePaginationComponent.prototype, "onPageChange", void 0);
        __decorate([
            aurelia_framework_1.bindable({
                defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
            })
        ], AuDatatablePaginationComponent.prototype, "parameters", void 0);
        AuDatatablePaginationComponent = __decorate([
            aurelia_framework_1.customElement('au-datatable-pagination'),
            aurelia_framework_1.inject(aurelia_framework_1.BindingEngine),
            aurelia_framework_1.inlineView("\n    <template>\n        <nav>\n            <ul class=\"au-pagination pagination\">\n                <li class=\"page-item\">\n                    <a class=\"page-link\" click.delegate=\"previousPage()\">\n                        <span aria-hidden=\"true\">&laquo;</span>\n                    </a>\n                </li>\n                <li class=\"page-item\" if.bind=\"parameters.currentPage > amountOfPages + 1\">\n                    <a class=\"page-link\" click.delegate=\"changePage(0)\">1</a>\n                </li>\n                <li class=\"page-item dots\" if.bind=\"parameters.currentPage > amountOfPages + 2\">\n                    <a class=\"page-link\">...</a>\n                </li>\n                <li class=\"page-item\" if.bind=\"!refreshing\" repeat.for=\"i of previousPages\">\n                    <a class=\"page-link\" click.delegate=\"changePage((parameters.currentPage + i) - amountOfPages - 1)\"> ${ calculatePreviousPageNumber(i) }</a>\n                </li>\n                <li class=\"page-item active\">\n                    <a class=\"page-link\">${ parameters.currentPage }</a>\n                </li>\n                <li class=\"page-item\" if.bind=\"!refreshing\" repeat.for=\"i of followingPages\">\n                    <a class=\"page-link\" click.delegate=\"changePage(parameters.currentPage + i)\">${ parameters.currentPage + (i + 1) }</a>\n                </li>\n                <li class=\"page-item dots\" if.bind=\"parameters.currentPage < totalPages - 3\">\n                    <a class=\"page-link\">...</a>\n                </li>\n                <li class=\"page-item\" if.bind=\"parameters.currentPage < totalPages - amountOfPages\">\n                    <a class=\"page-link\" click.delegate=\"changePage(totalPages - 1)\">${ totalPages }</a>\n                </li>\n                <li class=\"page-item\">\n                    <a class=\"page-link\" click.delegate=\"nextPage()\">\n                        <span aria-hidden=\"true\">&raquo;</span>\n                    </a>\n                </li>\n            </ul>\n            <style>\n                .au-pagination {\n                    list-style: none;\n                }\n\n                .au-pagination li {\n                    float: left;\n                }\n\n                .au-pagination li a {\n                    padding: 5px 10px;\n                }\n            </style>    \n        </nav>\n    </template>\n")
        ], AuDatatablePaginationComponent);
        return AuDatatablePaginationComponent;
    }());
    exports.AuDatatablePaginationComponent = AuDatatablePaginationComponent;
});

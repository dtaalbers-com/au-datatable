System.register(["aurelia-framework"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, AuDatatableFilterComponent;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            AuDatatableFilterComponent = /** @class */ (function () {
                function AuDatatableFilterComponent() {
                    this.label_clear_filter = 'Clear filter';
                    this.filter_values = [];
                }
                AuDatatableFilterComponent.prototype.attached = function () {
                    var _this = this;
                    this.get_columns_count();
                    document.getElementsByTagName('html')[0].addEventListener('click', function (e) { return _this.hide_filter_dropdowns(e); });
                };
                AuDatatableFilterComponent.prototype.detached = function () {
                    var _this = this;
                    document.getElementsByTagName('html')[0].removeEventListener('click', function (e) { return _this.hide_filter_dropdowns(e); });
                };
                AuDatatableFilterComponent.prototype.should_generate_content = function (column) {
                    return this.columns.some(function (x) { return x == column; });
                };
                AuDatatableFilterComponent.prototype.should_add_filter = function (filter, column) {
                    return filter.apply_to_columns.some(function (x) { return x == column; });
                };
                AuDatatableFilterComponent.prototype.select_filter = function (event, filter, column) {
                    return __awaiter(this, void 0, void 0, function () {
                        var value, response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (typeof this.on_filter != 'function')
                                        throw new Error('[au-table-filter:select_filter] No on_filter() callback has been set');
                                    value = this.filter_values[column];
                                    if (!value) return [3 /*break*/, 2];
                                    this.remove_filters_for_column(column);
                                    this.parameters.filters.push({
                                        value: value,
                                        description: filter.description,
                                        selected_column: column
                                    });
                                    this.set_active_label_filter(event);
                                    return [4 /*yield*/, this.on_filter(this.parameters)];
                                case 1:
                                    response = _a.sent();
                                    this.parameters.total_records = response.total_records;
                                    this.parameters.table_data = response.data;
                                    this.reset();
                                    return [3 /*break*/, 3];
                                case 2:
                                    this.show_input_warning(event);
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                };
                AuDatatableFilterComponent.prototype.is_selected_filter = function (filter, column) {
                    return this.parameters.filters.some(function (x) { return x.description == filter.description && x.selected_column == column; });
                };
                AuDatatableFilterComponent.prototype.show_filters = function (event) {
                    this.active_filter_btn = event.target;
                    var parent = event.target.closest('div');
                    var filter = parent.getElementsByClassName('au-filter-container')[0];
                    filter.style.display = filter.style.display == 'block' ? 'none' : 'block';
                };
                AuDatatableFilterComponent.prototype.input_changed = function (column) {
                    return __awaiter(this, void 0, void 0, function () {
                        var response, filter, response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!this.filter_values[column]) return [3 /*break*/, 2];
                                    this.remove_filters_for_column(column);
                                    return [4 /*yield*/, this.on_filter(this.parameters)];
                                case 1:
                                    response = _a.sent();
                                    this.parameters.total_records = response.total_records;
                                    this.parameters.table_data = response.data;
                                    this.reset();
                                    return [3 /*break*/, 4];
                                case 2:
                                    if (!this.parameters.filters.some(function (x) { return x.selected_column == column; })) return [3 /*break*/, 4];
                                    filter = this.parameters.filters.find(function (x) { return x.selected_column == column; });
                                    filter.value = this.filter_values[column];
                                    return [4 /*yield*/, this.on_filter(this.parameters)];
                                case 3:
                                    response = _a.sent();
                                    this.parameters.total_records = response.total_records;
                                    this.parameters.table_data = response.data;
                                    this.reset();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                };
                AuDatatableFilterComponent.prototype.clear_filter = function (event, column) {
                    return __awaiter(this, void 0, void 0, function () {
                        var parent, input, response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    parent = event.target.closest('td');
                                    input = parent.getElementsByClassName('au-filter-input')[0];
                                    this.remove_filters_for_column(column);
                                    input.value = '';
                                    this.filter_values[column] = undefined;
                                    return [4 /*yield*/, this.on_filter(this.parameters)];
                                case 1:
                                    response = _a.sent();
                                    this.parameters.total_records = response.total_records;
                                    this.parameters.table_data = response.data;
                                    this.reset();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                AuDatatableFilterComponent.prototype.get_columns_count = function () {
                    this.au_table_filter = document.getElementsByClassName('au-table-filter')[0];
                    var thead = this.au_table_filter.closest('thead');
                    var headers = thead.getElementsByTagName('tr')[0];
                    this.amount_of_columns = headers.getElementsByTagName('th').length;
                };
                AuDatatableFilterComponent.prototype.hide_filter_dropdowns = function (event) {
                    if (this.active_filter_btn == event.target)
                        return;
                    var ignore_elements = ['au-filter', 'au-filter-cell', 'au-filter-input', 'au-clear', 'au-clear-icon'];
                    if (Array.from(event.target.classList).some(function (x) { return ignore_elements.some(function (y) { return y == x; }); }))
                        return;
                    if (!this.filter_elements)
                        this.filter_elements = this.au_table_filter.getElementsByClassName('au-filter-container');
                    Array.from(this.filter_elements).forEach(function (x) { return x.style.display = 'none'; });
                };
                AuDatatableFilterComponent.prototype.show_input_warning = function (event) {
                    var parent = event.target.closest('td');
                    var input = parent.getElementsByClassName('au-filter-input')[0];
                    input.style.border = '1px red solid';
                    setTimeout(function () { return input.style.border = '1px #ddd solid'; }, 500);
                };
                AuDatatableFilterComponent.prototype.set_active_label_filter = function (event) {
                    event.target.classList.add('active');
                };
                AuDatatableFilterComponent.prototype.remove_filters_for_column = function (column) {
                    this.remove_active_labels_for_column(column);
                    this.parameters.filters = this.parameters.filters
                        .filter(function (x) { return x.selected_column != column; });
                };
                AuDatatableFilterComponent.prototype.remove_active_labels_for_column = function (column) {
                    var filters = this.au_table_filter.getElementsByClassName('au-filter');
                    Array.from(filters).forEach(function (x) {
                        if (x.getAttribute('data-column') == column)
                            x.classList.remove('active');
                    });
                };
                AuDatatableFilterComponent.prototype.reset = function () {
                    this.parameters.current_page = this.parameters.total_records > 0 ? 1 : 0;
                    this.parameters.skip = 0;
                };
                __decorate([
                    aurelia_framework_1.bindable
                ], AuDatatableFilterComponent.prototype, "on_filter", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AuDatatableFilterComponent.prototype, "columns", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AuDatatableFilterComponent.prototype, "btn_classes", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AuDatatableFilterComponent.prototype, "filters", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AuDatatableFilterComponent.prototype, "label_clear_filter", void 0);
                __decorate([
                    aurelia_framework_1.bindable({
                        defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
                    })
                ], AuDatatableFilterComponent.prototype, "parameters", void 0);
                AuDatatableFilterComponent = __decorate([
                    aurelia_framework_1.customElement('au-datatable-filter'),
                    aurelia_framework_1.inlineView("\n    <template>\n        <tr class=\"au-table-filter\">\n            <td class=\"au-filter-cell\" repeat.for=\"i of amount_of_columns\" if.bind=\"parameters\">\n                <div if.bind=\"should_generate_content(i)\">\n                    <input class=\"au-filter-input\" value.two-way=\"filter_values[i]\" type=\"text\" change.delegate=\"input_changed(i)\">\n                    <button class=\"au-filter-btn\" click.delegate=\"show_filters($event)\" class.bind=\"btn_classes\">&#9783;</button>\n                    <div class=\"au-filter-container\">\n                        <ul class=\"au-filters\">\n                            <li class=\"au-filter ${ is_selected_filter(filter, i) ? 'active': ''}\" data-column=\"${i}\" repeat.for=\"filter of filters\" if.bind=\"should_add_filter(filter ,i)\" click.delegate=\"select_filter($event, filter, i)\"> ${ filter.description }</li>\n                            <li class=\"au-clear\" click.delegate=\"clear_filter($event, i)\">${ label_clear_filter } <span class=\"au-clear-icon\">&#10006;</span></li>\n                        </ul>\n                    </div>\n                </div>\n            </td>\n            <style>\n                .au-table-filter .au-filter-input {\n                    width: calc(100% - 35px);\n                    transition: 1s;\n                    outline: none;\n                    height: 25px;\n                    border: 1px #ddd solid;\n                }\n\n                .au-table-filter .au-filter-btn {\n                    width: 30px;\n                    margin-left: 5px;\n                    float: right;\n                    outline: none;\n                }\n\n                .au-table-filter .au-filter-container {\n                    width: 100%;\n                    display: none;\n                }\n\n                .au-table-filter .au-filter-container .au-filters {\n                    list-style: none;\n                    padding: 10px;\n                    border: 1px solid #ddd;\n                    margin-top: 5px;\n                    position: relative;\n                    background-color: white;\n                    top: 0;\n                    bottom: 0;\n                    font-size: 8pt;\n                    right: 0;\n                    margin-bottom: 0;\n                }\n\n                .au-table-filter .au-filter-container .au-filters .au-filter {\n                    border-bottom: 1px solid #ddd;\n                    padding: 2px 5px;\n                }\n\n                .au-table-filter .au-filter-container .au-filters .au-clear {\n                    margin-top: 20px;\n                    font-size: 8pt;\n                    padding: 2px 5px;\n                    background: #333;\n                    color: white;\n                }\n\n                .au-table-filter .au-filter-container .au-filters .au-clear:hover {\n                    cursor: pointer;\n                }\n\n                .au-table-filter .au-filter-container .au-filters .au-clear .au-clear-icon {\n                    color: white;\n                    float: right;\n                    margin-top: 1px;\n                }\n\n                .au-table-filter .au-filter-container .au-filters .au-filter.active {\n                    background-color: #b9b8b8;\n                    color: white\n                }\n\n                .au-table-filter .au-filter-container .au-filters .au-filter:hover {\n                    cursor: pointer;\n                }\n            </style>\n        </tr>\n    </template>\n")
                ], AuDatatableFilterComponent);
                return AuDatatableFilterComponent;
            }());
            exports_1("AuDatatableFilterComponent", AuDatatableFilterComponent);
        }
    };
});

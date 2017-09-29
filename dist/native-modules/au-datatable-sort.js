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
import { bindable, customAttribute, bindingMode, inject } from 'aurelia-framework';
var AuDatatableSortCustomAttribute = /** @class */ (function () {
    function AuDatatableSortCustomAttribute(element) {
        this.element = element;
        this.activeColor = '#f44336';
        this.inactiveColor = '#000';
        this.template = "\n        <span class=\"sorting\" style=\"float: right;\">\n            <span class=\"ascending sort\" style=\"font-weight: bold;\">&#8593;</span>\n            <span class=\"descending sort\" style=\"margin-left: -3px;\">&#8595;</span>\n        </span>\n    ";
    }
    AuDatatableSortCustomAttribute.prototype.attached = function () {
        var _this = this;
        if (this.element.nodeName != 'THEAD')
            throw new Error('[au-table-sort:attached] au-table-sort needs to be bound to a THEAD node');
        this.headers = Array.from(this.element.getElementsByTagName('th'));
        this.columns.forEach(function (column) {
            var header = _this.headers[column];
            header.style.cursor = 'pointer';
            header.setAttribute('index', column.toString());
            header.addEventListener('click', function (event) { return _this.sort(event); });
            header.innerHTML = header.innerHTML + _this.template;
            if (_this.parameters.sortColumn == column)
                _this.setActive(header, _this.parameters.sortDirection);
        });
    };
    AuDatatableSortCustomAttribute.prototype.sort = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var columnIndex, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof this.onSort != 'function')
                            throw new Error('[au-table-sort:sort] No onSort() callback has been set');
                        columnIndex = this.getIndex(event.target);
                        if (this.parameters.sortColumn == columnIndex) {
                            switch (this.parameters.sortDirection) {
                                case 'ascending':
                                    this.parameters.sortDirection = 'descending';
                                    break;
                                case 'descending':
                                    this.parameters.sortDirection = undefined;
                                    break;
                                default:
                                    this.parameters.sortDirection = 'ascending';
                                    break;
                            }
                        }
                        else {
                            this.parameters.sortColumn = columnIndex;
                            this.parameters.sortDirection = 'ascending';
                        }
                        this.setActive(event.target, this.parameters.sortDirection);
                        return [4 /*yield*/, this.onSort(this.parameters)];
                    case 1:
                        response = _a.sent();
                        this.parameters.tableData = response.data;
                        this.parameters.totalRecords = response.totalRecords;
                        return [2 /*return*/];
                }
            });
        });
    };
    AuDatatableSortCustomAttribute.prototype.setActive = function (target, direction) {
        this.reset();
        if (target.nodeName == 'SPAN')
            target = target.parentNode.closest('th');
        var sortContainer = target.getElementsByClassName('sorting')[0];
        var sort = sortContainer.getElementsByClassName(direction)[0];
        if (sort)
            sort.style.color = this.activeColor;
    };
    AuDatatableSortCustomAttribute.prototype.reset = function () {
        var _this = this;
        this.headers.forEach(function (x) {
            var sorts = x.getElementsByClassName('sorting');
            if (sorts.length == 0)
                return;
            Array.from(sorts[0].getElementsByTagName('span')).forEach(function (x) { return x.style.color = _this.inactiveColor; });
        });
    };
    AuDatatableSortCustomAttribute.prototype.getIndex = function (target) {
        if (target.nodeName == 'SPAN')
            target = target.parentNode.closest('th');
        return target.getAttribute('index');
    };
    __decorate([
        bindable
    ], AuDatatableSortCustomAttribute.prototype, "onSort", void 0);
    __decorate([
        bindable
    ], AuDatatableSortCustomAttribute.prototype, "columns", void 0);
    __decorate([
        bindable
    ], AuDatatableSortCustomAttribute.prototype, "activeColor", void 0);
    __decorate([
        bindable
    ], AuDatatableSortCustomAttribute.prototype, "inactiveColor", void 0);
    __decorate([
        bindable({
            defaultBindingMode: bindingMode.twoWay,
        })
    ], AuDatatableSortCustomAttribute.prototype, "parameters", void 0);
    AuDatatableSortCustomAttribute = __decorate([
        customAttribute('au-datatable-sort'),
        inject(Element)
    ], AuDatatableSortCustomAttribute);
    return AuDatatableSortCustomAttribute;
}());
export { AuDatatableSortCustomAttribute };

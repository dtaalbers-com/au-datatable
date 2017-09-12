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
import { customElement, bindable, inlineView } from 'aurelia-framework';
var AuDatatablePagesizeComponent = /** @class */ (function () {
    function AuDatatablePagesizeComponent() {
    }
    AuDatatablePagesizeComponent.prototype.bind = function () {
        if (!this.page_sizes || this.page_sizes.length == 0)
            throw new Error('[au-table-pagesize:bind] No page sizes has been bound.');
        this.parameters.page_size = this.page_sizes[0];
    };
    AuDatatablePagesizeComponent.prototype.page_size_change = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof this.on_page_size_change != 'function')
                            throw new Error('[au-table-pagesize:page_size_change] No on_page_size_change() callback has been set');
                        this.parameters.page_size = this.selected_page_size;
                        this.reset();
                        return [4 /*yield*/, this.on_page_size_change(this.parameters)];
                    case 1:
                        response = _a.sent();
                        this.parameters.total_records = response.total_records;
                        this.parameters.table_data = response.data;
                        return [2 /*return*/];
                }
            });
        });
    };
    AuDatatablePagesizeComponent.prototype.reset = function () {
        this.parameters.current_page = this.parameters.total_records > 0 ? 1 : 0;
        this.parameters.skip = 0;
    };
    __decorate([
        bindable
    ], AuDatatablePagesizeComponent.prototype, "page_sizes", void 0);
    __decorate([
        bindable
    ], AuDatatablePagesizeComponent.prototype, "classes", void 0);
    __decorate([
        bindable
    ], AuDatatablePagesizeComponent.prototype, "on_page_size_change", void 0);
    __decorate([
        bindable
    ], AuDatatablePagesizeComponent.prototype, "parameters", void 0);
    AuDatatablePagesizeComponent = __decorate([
        customElement('au-datatable-pagesize'),
        inlineView("\n    <template>\n        <div class=\"au-table-pagesize\">\n            <select class.bind=\"classes\" value.bind=\"selected_page_size\" change.delegate=\"page_size_change()\">\n                <option repeat.for=\"size of page_sizes\" model.bind=\"size\">${ size }</option>\n            </select>\n        </div>\n    </template>\n")
    ], AuDatatablePagesizeComponent);
    return AuDatatablePagesizeComponent;
}());
export { AuDatatablePagesizeComponent };

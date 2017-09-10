var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuTableCustomAttribute = /** @class */ (function () {
        function AuTableCustomAttribute() {
        }
        AuTableCustomAttribute.prototype.set_data = function () {
            if (this.starting_data.length > this.parameters.page_size)
                throw new Error('[au-table:bind] starting data is larger than page size.');
            this.parameters.table_data = [].concat(this.starting_data);
            this.parameters.current_page = 1;
            this.parameters.skip = 0;
        };
        AuTableCustomAttribute.prototype.update_current_page = function () {
            this.parameters.current_page = this.parameters.total_records > 0 ? 1 : 0;
        };
        __decorate([
            aurelia_framework_1.bindable({
                changeHandler: 'set_data'
            })
        ], AuTableCustomAttribute.prototype, "starting_data", void 0);
        __decorate([
            aurelia_framework_1.bindable({
                defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
                changeHandler: 'update_current_page'
            })
        ], AuTableCustomAttribute.prototype, "parameters", void 0);
        AuTableCustomAttribute = __decorate([
            aurelia_framework_1.customAttribute('au-table')
        ], AuTableCustomAttribute);
        return AuTableCustomAttribute;
    }());
    exports.AuTableCustomAttribute = AuTableCustomAttribute;
});

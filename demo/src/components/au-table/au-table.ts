import { autoinject, bindable, customAttribute, bindingMode, BindingEngine } from 'aurelia-framework';

@customAttribute('au-table')
export class AuTableCustomAttribute {

    @bindable({ changeHandler: 'set_data' }) public starting_data: Array<any>;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public page_size: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public total_records: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public current_page: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public table_data: Array<any>;

    constructor(
        private element: Element,
        private binding_engine: BindingEngine
    ) { }

    public bind(): void { }

    private set_data(): void {
        if (this.starting_data.length > this.page_size) throw new Error('[au-table:bind] starting data is larger than page size.');
        this.table_data = [].concat(this.starting_data);
        this.current_page = 1;
    }
}	
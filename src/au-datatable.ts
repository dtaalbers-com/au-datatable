import { bindable, customAttribute, bindingMode } from 'aurelia-framework';
import { AuDatatableParameters } from './au-datatable-contracts/AuDatatableParameters';

@customAttribute('au-datatable')
export class AuDatatableCustomAttribute {

    @bindable({
        changeHandler: 'set_data'
    })
    public starting_data: Array<never>;
    @bindable({
        defaultBindingMode: bindingMode.twoWay,
        changeHandler: 'update_current_page'
    })
    public parameters: AuDatatableParameters;

    private set_data(): void {
        if (this.starting_data.length > this.parameters.page_size) throw new Error('[au-table:bind] starting data is larger than page size.');
        this.parameters.table_data = [].concat(this.starting_data);
        this.parameters.current_page = 1;
        this.parameters.skip = 0;
    }

    private update_current_page(): void {
        this.parameters.current_page = this.parameters.total_records > 0 ? 1 : 0;
    }
}	
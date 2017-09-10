import { customElement, bindable, bindingMode } from 'aurelia-framework';
import { AuTableParameters } from '../au-table-contracts/AuTableParameters';
import { AuTableResponse } from '../au-table-contracts/AuTableResponse';

@customElement('au-table-search')
export class AuTableSearch {

    @bindable public placeholder: string;
    @bindable public input_classes: string;
    @bindable public on_search_change: Function;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    }) public parameters: AuTableParameters

    public async search(): Promise<void> {
        if (typeof this.on_search_change != 'function')
            throw new Error('[au-table-search:search] No on_search_change() callback has been set');
        this.reset();
        let response = await this.on_search_change(this.parameters) as AuTableResponse;
        this.parameters.table_data = response.data;
        this.parameters.total_records = response.total_records;
        this.reset();
    }

    private reset(): void {
        this.parameters.current_page = this.parameters.total_records > 0 ? 1 : 0;
        this.parameters.skip = 0;
    }
}
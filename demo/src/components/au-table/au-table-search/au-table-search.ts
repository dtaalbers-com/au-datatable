import { customElement, bindable, bindingMode } from 'aurelia-framework';
import { IAuTableParameters } from '../au-table-contracts/IAuTableParameters';

@customElement('au-table-search')
export class AuTableSearch {

    @bindable public placeholder: string;
    @bindable public input_classes: string;
    @bindable public on_search_change: Function;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    }) public parameters: IAuTableParameters

    public async search(): Promise<void> {
        if (typeof this.on_search_change != 'function')
            throw new Error('[au-table-search:search] No on_search_change() callback has been set');
        this.reset();
        this.parameters.table_data = await this.on_search_change(this.parameters);
        this.reset();
    }

    private reset(): void {
        this.parameters.current_page = this.parameters.total_records > 0 ? 1 : 0;
        this.parameters.skip = 0;
    }
}
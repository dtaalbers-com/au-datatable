import { customElement, bindable, bindingMode, inlineView } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';
import { AuDatatableResponse } from './AuDatatableResponse';

@customElement('au-datatable-search')
@inlineView(`
    <template>
        <div class="au-table-search">
            <input keyup.delegate="search() & debounce:500" 
                value.bind="parameters.searchQuery" 
                type="text" 
                placeholder.bind="placeholder" 
                class.bind="inputClasses" />
        </div>
    </template>
`)
export class AuDatatableSearchComponent {

    @bindable public placeholder: string;
    @bindable public inputClasses: string;
    @bindable public onSearchChange: Function;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    }) public parameters: AuDatatableParameters

    public async search(): Promise<void> {
        if (typeof this.onSearchChange != 'function')
            throw new Error('[au-table-search:search] No onSearchChange() callback has been set');
        this.reset();
        let response = await this.onSearchChange(this.parameters) as AuDatatableResponse;
        this.parameters.tableData = response.data;
        this.parameters.totalRecords = response.totalRecords;
        this.reset();
    }

    private reset(): void {
        this.parameters.currentPage = this.parameters.totalRecords > 0 ? 1 : 0;
        this.parameters.skip = 0;
    }
}
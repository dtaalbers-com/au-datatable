import { bindable, customAttribute, bindingMode } from 'aurelia-framework';
import { AuDatatableParameters } from './AuDatatableParameters';

@customAttribute('au-datatable')
export class AuDatatableCustomAttribute {

    @bindable({
        changeHandler: 'setData'
    })
    public startingData: Array<never>;
    @bindable({
        defaultBindingMode: bindingMode.twoWay
    })
    public parameters: AuDatatableParameters;

    private setData(): void {
        if (this.startingData.length > this.parameters.pageSize) throw new Error('[au-table:bind] starting data is larger than page size.');
        this.parameters.tableData = [].concat(this.startingData);
        if (!this.parameters.currentPage) this.parameters.currentPage = 1;
        this.parameters.skip = 0;
    }
}	
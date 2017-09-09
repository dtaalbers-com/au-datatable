import { autoinject, bindable, bindingMode, inlineView, customElement } from 'aurelia-framework';
import { IAuTableParameters } from '../au-table-contracts/IAuTableParameters';
import { IAuTableFilter } from '../au-table-contracts/IAuTableFilter';

@customElement('au-table-filter')
export class AuTableFilter {

    @bindable public on_filter: Function;
    @bindable public columns: Array<number>;
    @bindable public btn_classes: string;
    @bindable public filters: Array<IAuTableFilter>;
    @bindable public label_clear_filter: string = 'clear filter';

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    }) public parameters: IAuTableParameters;

    private amount_of_columns: number;
    private au_table_filter: any;
    private filter_elements: Array<any>;
    private active_filter_btn: any;
    private filter_values: Array<string> = [];

    public attached(): void {
        this.get_columns_count();
        document.getElementsByTagName('html')[0].addEventListener('click', e => this.hide_filter_dropdowns(e));
    }

    public detached(): void {
        document.getElementsByTagName('html')[0].removeEventListener('click', e => this.hide_filter_dropdowns(e));
    }

    public should_generate_content(column: number): boolean {
        return this.columns.some(x => x == column);
    }

    public should_add_filter(filter: IAuTableFilter, column: number): boolean {
        return filter.apply_to_columns.some(x => x == column);
    }

    public select_filter(event: any, filter: IAuTableFilter, column: number): void {
        if (typeof this.on_filter != 'function')
            throw new Error('[au-table-filter:select_filter] No on_filter() callback has been set');
        let value = this.filter_values[column];
        if (value) {
            this.remove_filters_for_column(column);
            this.parameters.filters.push({
                value: value,
                description: filter.description,
                selected_column: column
            });
            this.set_active_label_filter(event);
        } else {
            this.show_input_warning(event);
        }
        console.log(this.parameters.filters);
    }

    public is_selected_filter(filter: IAuTableFilter, column: number): boolean {
        return this.parameters.filters.some(x => x.description == filter.description && x.selected_column == column);
    }

    public show_filters(event: any): void {
        this.active_filter_btn = event.target;
        let parent = event.target.closest('div');
        let filter = parent.getElementsByClassName('au-filter-container')[0];
        filter.style.display = filter.style.display == 'block' ? 'none' : 'block';
    }

    public clear_filter(column: number) {
        this.remove_filters_for_column(column);
        this.filter_values = this.filter_values.filter((x, index) => index != column);
    }

    private get_columns_count(): void {
        this.au_table_filter = document.getElementsByClassName('au-table-filter')[0];
        let thead = this.au_table_filter.closest('thead');
        let headers = thead.getElementsByTagName('tr')[0];
        this.amount_of_columns = headers.getElementsByTagName('th').length;
    }

    private hide_filter_dropdowns(event: any): void {
        if (this.active_filter_btn == event.target) return;
        let ignore_elements = ['au-filter', 'au-filter-cell', 'au-filter-input', 'au-clear', 'au-clear-icon'];
        if (Array.from(event.target.classList).some(x => ignore_elements.some(y => y == x))) return;
        if (!this.filter_elements) this.filter_elements = this.au_table_filter.getElementsByClassName('au-filter-container');
        Array.from(this.filter_elements).forEach(x => (<any>x).style.display = 'none');
    }

    private show_input_warning(event: any): void {
        let parent = event.target.closest('td');
        let input = parent.getElementsByClassName('au-filter-input')[0];
        input.style.border = '1px red solid';
        setTimeout(() => input.style.border = '1px #ddd solid', 500);
    }

    private set_active_label_filter(event: any): void {
        event.target.classList.add('active');
    }

    private remove_filters_for_column(column: number): void {
        this.remove_active_labels_for_column(column);
        this.parameters.filters = this.parameters.filters
            .filter(x => x.selected_column != column);
    }

    private remove_active_labels_for_column(column: number): void {
        let filters = this.au_table_filter.getElementsByClassName('au-filter');
        Array.from(filters).forEach(x => {
            if ((<any>x).getAttribute('data-column') == column) (<any>x).classList.remove('active')
        });
    }
}	
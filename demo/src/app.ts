import { SortDirections } from './models/enums/SortDirections';
import { IDataTableSettings } from './components/aurelia-bs-datatable/contracts/IDataTableSettings';
import 'bootstrap';

export class App {

    /**
     * The datatable settings
     */
    public settings: IDataTableSettings = {
        columns: [
            {
                title: '',
                data: 'thumbnail',
                image: true,
                sortable: false
            },
            {
                title: 'Name',
                data: 'name',
                sortable: true
            },
            {
                title: 'City',
                data: 'city',
                sortable: true
            },
            {
                title: 'Username',
                data: 'username',
                sortable: true
            },
            {
                title: 'Email',
                data: 'email',
                sortable: true
            },            
            {
                title: 'Nationality',
                data: 'nat',
                sortable: true
            }
        ],
        endpoint: `https://api.dtaalbers.com/datatable`,
        language: {
            filtered: 'filtered',
            no_results: 'No records found.',
            loading: 'Loading...',
            record_information: 'START_RECORD to END_RECORD of total TOTAL_RECORDS records ',
            reset_selection: 'Remove selection',
            search_placeholder: 'Search..'
        },
        initial_sort_column: 1,
        initial_sort_direction: SortDirections.Ascending,
        page_sizes: [
            10,
            25,
            50,
            100
        ],
        show_search: true,
        on_row_double_click: (index: number, row_data: any) => alert('double clicked'),
        select_on_click: true,
        button_classes: 'btn-create'
    };
}

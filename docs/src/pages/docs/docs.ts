import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class DocsPage {

    constructor(
        private router: Router
    ) { }

    public back(): void {
        this.router.navigateToRoute('intro');
    }
}
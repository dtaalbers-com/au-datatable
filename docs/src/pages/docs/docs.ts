import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import * as $ from 'jquery';

@autoinject()
export class DocsPage {

    constructor(
        private router: Router
    ) { }

    public back(): void {
        this.router.navigateToRoute('intro');
    }

    public backToTop(): void {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
}
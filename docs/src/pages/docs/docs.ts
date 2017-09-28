import { Router } from 'aurelia-router';

export class DocsPage {

    constructor(
        private router: Router
    ) { }

    public back(): void {
        this.router.navigateToRoute('intro');
    }
}
import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class IntroPage {

    constructor(
        private router: Router
    ) { }

    public openServerSideDemo(): void {
        this.router.navigateToRoute('server-side-demo');
    }

    public openClientSideDemo(): void {
        this.router.navigateToRoute('client-side-demo');
    }
}
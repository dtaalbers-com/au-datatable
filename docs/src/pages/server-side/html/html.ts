import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class ServerSideHtmlPage {

    constructor(
        private router: Router,
    ) { }

    public openDemoPage(): void {
        this.router.navigateToRoute('server-side-demo');
    }

    public openHtmlPage(): void {
        this.router.navigateToRoute('server-side-html');
    }

    public openTypescriptPage(): void {
        this.router.navigateToRoute('server-side-typescript');
    }

    public openSassPage(): void {
        this.router.navigateToRoute('server-side-sass');
    }

    public backToIntro(): void {
        this.router.navigateToRoute('intro');
    }  
}
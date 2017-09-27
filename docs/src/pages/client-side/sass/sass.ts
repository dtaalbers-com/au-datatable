import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class ServerSideTypescriptPage {

    constructor(
        private router: Router,
    ) { } 

    public openDemoPage(): void {
        this.router.navigateToRoute('client-side-demo');
    }

    public openHtmlPage(): void {
        this.router.navigateToRoute('client-side-html');
    }

    public openTypescriptPage(): void {
        this.router.navigateToRoute('client-side-typescript');
    }

    public openSassPage(): void {
        this.router.navigateToRoute('client-side-sass');
    }

    public backToIntro(): void {
        this.router.navigateToRoute('intro');
    }  
}
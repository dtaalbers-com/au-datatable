import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { AppConfiguration } from '../../AppConfiguration';

@autoinject()
export class IntroPage {

    public appVersion: string = AppConfiguration.appVersion;

    constructor(
        private router: Router
    ) { }

    public openServerSideDemo(): void {
        this.router.navigateToRoute('server-side-demo');
    }

    public openClientSideDemo(): void {
        this.router.navigateToRoute('client-side-demo');
    }

    public openDocs(): void {
        this.router.navigateToRoute('docs');
    }
}
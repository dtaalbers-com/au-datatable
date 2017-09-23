import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class IntroPage {

    constructor(
        private router: Router
    ) { }

    public openDemo(): void {
        this.router.navigate('server-side-demo');
    }
}
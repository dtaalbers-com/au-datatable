import { Router, RouterConfiguration } from 'aurelia-router';
// import 'bootstrap';

export class App {
    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'dtaalbers.com';
        config.map([
            {
                route: ['', 'intro'],
                name: 'intro',
                moduleId: './pages/intro/intro',
                title: 'Aurelia Datatable Intro'
            },
            {
                route: 'server-side-demo',
                name: 'server-side-demo',
                moduleId: './pages/server-side-demo/server-side-demo',
                title: 'Server Side'
            }
        ]);
    }
}

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
                route: 'server-side/demo',
                name: 'server-side-demo',
                moduleId: './pages/server-side/demo/demo',
                title: 'Server Side'
            },
            {
                route: 'server-side/html',
                name: 'server-side-html',
                moduleId: './pages/server-side/html/html',
                title: 'Server Side'
            },
            {
                route: 'server-side/typescript',
                name: 'server-side-typescript',
                moduleId: './pages/server-side/typescript/typescript',
                title: 'Server Side'
            },
            {
                route: 'server-side/sass',
                name: 'server-side-sass',
                moduleId: './pages/server-side/sass/sass',
                title: 'Server Side'
            }
        ]);
    }
}

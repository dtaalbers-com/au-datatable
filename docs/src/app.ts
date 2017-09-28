import { Router, RouterConfiguration } from 'aurelia-router';
// import 'bootstrap';

export class App {
    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'dtaalbers.com';
        config.options.pushState = true
        config.map([
            {
                route: ['', 'intro'],
                name: 'intro',
                moduleId: './pages/intro/intro',
                title: 'Aurelia Datatable Intro'
            },
            {
                route: 'demo/server-side',
                name: 'server-side-demo',
                moduleId: './pages/server-side/demo/demo',
                title: 'Server Side'
            },
            {
                route: 'demo/server-side/html',
                name: 'server-side-html',
                moduleId: './pages/server-side/html/html',
                title: 'Server Side'
            },
            {
                route: 'demo/server-side/typescript',
                name: 'server-side-typescript',
                moduleId: './pages/server-side/typescript/typescript',
                title: 'Server Side'
            },
            {
                route: 'demo/server-side/sass',
                name: 'server-side-sass',
                moduleId: './pages/server-side/sass/sass',
                title: 'Server Side'
            },
            {
                route: 'demo/client-side',
                name: 'client-side-demo',
                moduleId: './pages/client-side/demo/demo',
                title: 'Client Side'
            },
            {
                route: 'demo/client-side/html',
                name: 'client-side-html',
                moduleId: './pages/client-side/html/html',
                title: 'Client Side'
            },
            {
                route: 'demo/client-side/typescript',
                name: 'client-side-typescript',
                moduleId: './pages/client-side/typescript/typescript',
                title: 'Client Side'
            },
            {
                route: 'demo/client-side/sass',
                name: 'client-side-sass',
                moduleId: './pages/client-side/sass/sass',
                title: 'Client Side'
            },
            {
                route: 'docs',
                name: 'docs',
                moduleId: './pages/docs/docs',
                title: 'Docs'
            }
        ]);
    }
}

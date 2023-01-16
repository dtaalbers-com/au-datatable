import Aurelia from 'aurelia';
import * as Plugin from "../src/configuration";
import { MyApp } from './my-app';

Aurelia
  // Register all exports of the plugin
  .register(Plugin)
  .app(MyApp)
  .start();

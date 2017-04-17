import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
  static inject = [RouterConfiguration, Router];

  configureRouter(config, router) {
    this.router = router;
    config.title = 'ReCommerce';
    config.map([
      { route: ['', 'home'],            name: 'home',       moduleId: 'home/home' },
      { route: 'cart',                  name: 'cart',       moduleId: 'cart/cart' },
      { route: 'cart/checkout',         name: 'checkout',   moduleId: 'cart/checkout' },
      { route: 'cart/checkout/confirm', name: 'confirm',    moduleId: 'cart/confirm' }
    ]);    
  }
}
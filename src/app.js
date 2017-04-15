import {EventAggregator} from 'aurelia-event-aggregator';
import {ShoppingCartQuantityUpdated} from './messages';
import {bindable} from 'aurelia-framework';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.ea = ea;
    this.message = 'Products';

    ea.subscribe(ShoppingCartQuantityUpdated, msg => {
      this.cartCount = msg.quantity;
    });
  }

  @bindable cartCount = 0;
}

import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShoppingCartQuantityUpdated} from '../resources/messages';

export class Navigation {
  static inject = [EventAggregator];

  @bindable router;

  constructor(ea) {
    this.ea = ea;
    this.cartCount = 0;

    ea.subscribe(ShoppingCartQuantityUpdated, msg => {
      this.cartCount = msg.quantity;
    });
  }
}
import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CartUniqueItemsCountChanged} from '../events/cart-events';

export class Navigation {
  static inject = [EventAggregator];

  @bindable router;

  constructor(ea) {
    this.ea = ea;
    this.cartCount = 0;

    ea.subscribe(CartUniqueItemsCountChanged, msg => {
      this.cartCount = msg.count;
    });
  }
}
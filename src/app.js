import {EventAggregator} from 'aurelia-event-aggregator';
import {ProductAddedToCart} from './messages';
import {bindable} from 'aurelia-framework';

export class App {
  static inject = [EventAggregator];

  constructor(ea) {
    this.ea = ea;
    this.message = 'Products';

    ea.subscribe(ProductAddedToCart, msg => {
      this.cartCount++;
    });
  }

  @bindable cartCount = 0;
}

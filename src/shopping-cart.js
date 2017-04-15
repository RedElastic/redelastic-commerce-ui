import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShoppingCartQuantityUpdated, ProductAddedToCart, ProductAlreadyInCart} from './messages';

export class ShoppingCart {  
  static inject = [EventAggregator];
  
  products = new Map();

  constructor(ea){
    this.ea = ea;
  }

  addToCart(id, quantity){
    if (this.products.has(id)) {
      this.ea.publish(new ProductAlreadyInCart(id));
    } else {
      this.products.set(id, quantity);
      this.ea.publish(new ShoppingCartQuantityUpdated(this.products.size));
      this.ea.publish(new ProductAddedToCart(id, quantity));
    }
  }
}
import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShoppingCartQuantityUpdated} from './messages';

export class ShoppingCart {  
  static inject = [EventAggregator];
  
  products = new Map();

  constructor(ea){
    this.ea = ea;
  }

  addToCart(id, quantity){
    this.products.set(id, quantity);
    this.ea.publish(new ShoppingCartQuantityUpdated(this.products.size));
  }
}
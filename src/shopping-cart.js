import {bindable, observable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShoppingCartQuantityUpdated, ProductAddedToCart, ProductAlreadyInCart} from './messages';

export class ShoppingCart {  
  static inject = [EventAggregator];

  @observable cart = new Map();

  constructor(ea){
    this.ea = ea;
  }

  addToCart(id, quantity){
    if (this.cart.has(id)) {
      this.ea.publish(new ProductAlreadyInCart(id));
    } else {      
      this.cart.set(id, quantity);
      this.ea.publish(new ShoppingCartQuantityUpdated(this.cart.size));
      this.ea.publish(new ProductAddedToCart(id, quantity));      
    }    
  }
}
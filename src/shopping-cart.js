import {bindable, observable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShoppingCartQuantityUpdated, ProductAddedToCart, ProductAlreadyInCart, ProductRemovedFromCart} from './messages';

export class ShoppingCart {  
  static inject = [EventAggregator];

  @observable cart = new Map();
  
  constructor(ea){
    this.ea = ea;
    this.taxes = 0;
    this.shipping = 0;
    this.total = 0;
    this.subtotal = 0;

    ea.subscribe(ProductRemovedFromCart, msg => {
      this.cart.delete(msg.id);
      this.ea.publish(new ShoppingCartQuantityUpdated(this.cart.size));
      this.recomputeTotals();
    });

    ea.subscribe(ProductAddedToCart, msg => {
      this.recomputeTotals();
    });
  }

  addToCart(id, data){
    if (this.cart.has(id)) {
      this.ea.publish(new ProductAlreadyInCart(id));
    } else {      
      this.cart.set(id, data);
      this.ea.publish(new ShoppingCartQuantityUpdated(this.cart.size));
      this.ea.publish(new ProductAddedToCart(id, data));            
    }    
  }

  recomputeTotals(){
    let subtotal = 0;
    for (var [id, data] of this.cart) {
      subtotal = subtotal + (data.price * data.quantity);
    }
    this.subtotal = subtotal;
    this.taxes = this.subtotal * 0.13;
    this.total = this.subtotal + this.taxes;
  }
}
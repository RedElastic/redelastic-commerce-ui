import {bindable, observable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShoppingCartQuantityUpdated, ProductAddedToCart, ProductAlreadyInCart, ProductRemovedFromCart, CartItemQuantityUpdated} from '../resources/messages';

export class Cart {  
  static inject = [EventAggregator];

  @observable items = new Map();
  
  constructor(ea){
    this.ea = ea;
    this.taxes = 0;
    this.shipping = 0;
    this.total = 0;
    this.subtotal = 0;

    ea.subscribe(ProductRemovedFromCart, msg => {
      this.items.delete(msg.id);
      this.ea.publish(new ShoppingCartQuantityUpdated(this.items.size));
      this.recomputeTotals();
    });

    ea.subscribe(ProductAddedToCart, msg => {
      this.recomputeTotals();
    });

    ea.subscribe(CartItemQuantityUpdated, msg => {
      let data = this.items.get(msg.id);
      data.quantity = msg.quantity;
      this.items.set(msg.id, data);
      this.recomputeTotals();
    });    
  }

  attached(){
    this.recomputeTotals();
  }

  addToCart(id, data){
    if (this.items.has(id)) {
      this.ea.publish(new ProductAlreadyInCart(id, data));
    } else {      
      this.items.set(id, data);
      this.ea.publish(new ShoppingCartQuantityUpdated(this.items.size));
      this.ea.publish(new ProductAddedToCart(id, data));            
    }    
  }

  recomputeTotals(){
    let subtotal = 0;
    for (var [id, data] of this.items) {
      subtotal = subtotal + (data.price * data.quantity);
    }
    this.subtotal = subtotal;
    this.taxes = this.subtotal * 0.13;
    this.total = this.subtotal + this.taxes;
  }
}

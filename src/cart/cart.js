import { bindable, observable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {
  ProductAddedToCart, 
  ProductAlreadyInCart, 
  ProductRemovedFromCart, 
  ProductQuantityChanged, 
  CartUniqueItemsCountChanged } from '../events/cart-events';

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
      this.removeFromCart(msg.id);
    });

    ea.subscribe(ProductQuantityChanged, msg => {
      this.changeQuantity(msg.id, msg.quantity);
    });    
  }

  // pipeline
  //--------------------------------------------------------
  activate(){
    
    /*if (!window.localStorage.getItem('cart_items')) {
      let items = new Map();
      window.localStorage.setItem('cart_items', items);
      this.items = items;
    } else {
      let obj = window.localStorage.getItem('cart_items');
      let items = new Map();
      Object.keys(obj).forEach(key => {
          items.set(key, obj[key]);
          items.set(key, obj[key]);
      });
      this.items = items;
    }*/

    this.recomputeTotals();
  }

  // actions
  //--------------------------------------------------------
  addToCart(id, data){
    if (this.items.has(id)) {
      this.ea.publish(new ProductAlreadyInCart(id, data));
    } else {
      this.items.set(id, data);
      this.ea.publish(new ProductAddedToCart(id, data));
      this.cartChanged();
    }    
  }

  removeFromCart(id){
    this.items.delete(id);
    this.cartChanged();
  }

  changeQuantity(id, quantity){
    let data = this.items.get(id);
    data.quantity = quantity;
    this.items.set(id, data);
    this.cartChanged();
  }

  cartChanged(){
    this.ea.publish(new CartUniqueItemsCountChanged(this.items.size));
    this.recomputeTotals();
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

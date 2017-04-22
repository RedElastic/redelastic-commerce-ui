import { bindable, observable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {WebAPI} from '../resources/web-api';
import {
  ProductAddedToCart, 
  ProductAlreadyInCart, 
  ProductRemovedFromCart, 
  ProductQuantityChanged, 
  CartUniqueItemsCountChanged } from '../events/cart-events';

export class Cart {  
  static inject = [EventAggregator, WebAPI];

  @observable items = new Map();
  
  constructor(ea, api){
    this.ea = ea;
    this.api = api;
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

    if (window.localStorage.getItem("userId") === null) {
      window.localStorage.setItem("userId", 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
    } 

    this.api.getCart(window.localStorage.getItem("userId")).then(cart => {
      let newCart = new Map();
      cart.forEach(function (item) {
        newCart.set(item.key, item.value);
      })
      this.items = newCart;
      this.ea.publish(new CartUniqueItemsCountChanged(this.items.size));
      this.recomputeTotals();
    });      
  }

  // pipeline
  //--------------------------------------------------------
  activate(){
    this.recomputeTotals();
  }

  // actions
  //--------------------------------------------------------
  addToCart(id, data){
    console.debug(data);
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
    console.debug(this.items);
    this.ea.publish(new CartUniqueItemsCountChanged(this.items.size));
    this.api.updateCart(window.localStorage.getItem("userId"), this.items);
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

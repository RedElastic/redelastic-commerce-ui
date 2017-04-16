import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ProductRemovedFromCart} from './messages';

export class ShoppingCartItem {  
  static inject = [EventAggregator];

  @bindable id;
  @bindable name;
  @bindable quantity;
  @bindable price;

  constructor(ea){
    this.ea = ea;
  }  

  getSubtotal(){
    return this.quantity * this.price;
  }

  removeFromCart(){
    this.ea.publish(new ProductRemovedFromCart(this.id));      
  }
}
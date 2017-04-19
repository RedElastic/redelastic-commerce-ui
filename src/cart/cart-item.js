import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ProductRemovedFromCart, ProductAddedToCart, ProductQuantityChanged} from '../events/cart-events';

export class CartItem {  
  static inject = [EventAggregator];

  @bindable id;
  @bindable name;
  @bindable quantity;
  @bindable price;

  constructor(ea){
    this.ea = ea;
    this.subtotal = 0;

    ea.subscribe(ProductAddedToCart, msg => {            
      this.recomputeSubtotal();
    });
  }  

  attached(){
    this.recomputeSubtotal();
  }

  recomputeSubtotal(){
    this.subtotal = this.quantity * this.price;
  }

  removeFromCart(){
    this.ea.publish(new ProductRemovedFromCart(this.id));      
    this.recomputeSubtotal();
  }

  decreaseQuantity(){
    if (this.quantity > 1) {
      this.quantity--;
      this.ea.publish(new ProductQuantityChanged(this.id, this.quantity));
      this.recomputeSubtotal();
    }
  }

  increaseQuantity(){
    this.quantity++;
    this.ea.publish(new ProductQuantityChanged(this.id, this.quantity));
    this.recomputeSubtotal();
  }
}
import {bindable} from 'aurelia-framework';
import {ShoppingCart} from './shopping-cart';

export class ProductCard { 
  static inject = [ShoppingCart];  

  constructor(cart){
    this.cart = cart;
  }

  @bindable id = "";
  @bindable name = "";
  @bindable description = "";    
  quantity = 1;
    
  addToCart(){
    this.cart.addToCart(this.id, this.quantity);
  }

  increaseQuantity(){
      this.quantity = this.quantity + 1;
  }
  decreaseQuantity(){
      if (this.quantity > 1) {
        this.quantity = this.quantity - 1;
      }
  }
}
import {bindable} from 'aurelia-framework';
import {Cart} from '../cart/cart';

export class ProductCard { 
  static inject = [Cart];  

  constructor(cart){
    this.cart = cart;
  }

  @bindable id = "";
  @bindable name = "";
  @bindable description = ""; 
  @bindable price;   
  quantity = 1;
    
  addToCart(){
    let data = {      
      name: this.name,
      description: this.description,
      quantity: this.quantity,
      price: this.price
    };
    this.cart.addToCart(this.id, data);
  }

  increaseQuantity(){
    this.quantity++;
  }

  decreaseQuantity(){
    if (this.quantity > 1) {
      this.quantity--;
    }
  }  
}
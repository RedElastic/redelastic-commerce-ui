import {Cart} from './cart';

export class Checkout {  
  static inject = [Cart];  

  constructor(cart){
    this.cart = cart;
  }

  getCartSize(){
    return this.cart.items.size;
  }

}

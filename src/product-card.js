import {bindable} from 'aurelia-framework';

export class ProductCard {    
  @bindable id = "";
  @bindable name = "";
  @bindable description = "";    
  quantity = 1;
    
  addToCart(){
    alert("in addToCart for: " + this.id);
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
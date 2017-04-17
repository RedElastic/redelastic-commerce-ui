import {Cart} from './cart';
import {ValidationRules, ValidationController} from 'aurelia-validation';

export class Checkout {  
  static inject = [Cart, ValidationController];  

  firstName;
  lastName;
  email;
  phone;
  country;
  province;
  city;
  postalCode;

  constructor(cart, validator){
    this.cart = cart;
    this.validator = validator;

    ValidationRules
      .ensure((c: Checkout) => c.firstName).required()
      .ensure((c: Checkout) => c.lastName).required()
      .ensure((c: Checkout) => c.email).required().email()
      .ensure((c: Checkout) => c.phone).required()
      .ensure((c: Checkout) => c.city).required()      
      .ensure((c: Checkout) => c.postalCode).required()
      .on(this);
  }

  getCartSize(){
    return this.cart.items.size;
  }

  submit() {
    this.validator.validate().then(result => {
      if (result.valid) {
        // do the thing
      } else {
        // do the other thing
      }
    });
  }
}

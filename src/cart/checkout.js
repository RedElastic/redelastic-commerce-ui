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

  countries = ['Canada'];
  provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon'
  ];

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
        
        let shippingInfo = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          country: this.country,
          province: this.province,
          city: this.city,
          postalCode: this.postalCode
        };        

        let order = { 
          shippingInfo: shippingInfo, 
          items: this.cart.items
        };

        console.log(order);
      }
    });
  }
}

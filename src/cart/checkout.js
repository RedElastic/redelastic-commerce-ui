import {Cart} from './cart';
import {ValidationRules, ValidationController} from 'aurelia-validation';
import {Router} from 'aurelia-router';
import {WebAPI} from '../resources/web-api';

export class Checkout {  
  static inject = [Cart, ValidationController, Router, WebAPI];  

  firstName;
  lastName;
  emailAddress;
  phone;
  street;
  apartment;
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

  constructor(cart, validator, router, api){
    this.cart = cart;
    this.validator = validator;
    this.router = router;
    this.api = api;

    ValidationRules
      .ensure((c: Checkout) => c.firstName).required()
      .ensure((c: Checkout) => c.lastName).required()
      .ensure((c: Checkout) => c.email).required().email()
      .ensure((c: Checkout) => c.phone).required()
      .ensure((c: Checkout) => c.street).required()
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
          emailAddress: this.emailAddress,
          phone: this.phone,
          street: this.street,
          apartment: this.apartment,
          country: this.country,
          province: this.province,
          city: this.city,
          postalCode: this.postalCode
        };        

        var items = Array.from(this.cart.items).map(([key, value]) => ({ 
          "productId": key,
          "quantity": value.quantity,
          "price": value.price,
          "subtotal": value.price * value.quantity
        }));

        let order = { 
          shippingInfo: shippingInfo, 
          items: items
        };

        this.api.placeOrder(order).then(uuid => {
          this.router.navigateToRoute("confirm", { id: uuid });
        });                
      }
    });
  }
}

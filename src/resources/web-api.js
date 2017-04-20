let latency = 200;

let shippingInfo = {
  firstName: "Joe",
  lastName: "Smith",
  street: "250 University Avenue",
  apartmentNum: "227",
  city: "Toronto",
  province: "Ontario",
  postalCode: "M5A0E3"
};

let items = [
  {
    id: "1",
    name: 'Radical Coffee Maker',
    price: 42.50,
    quantity: 1,
    subtotal: 42.50
  },
  {
    id: "2",
    name: 'The Worst Shit Ever',
    price: 12.99,
    quantity: 3,
    subtotal: 38.97
  },
];

let totals = {
  subtotal: 81.48,
  taxes: 10.59,
  total: 92.07
}

import { HttpClient } from 'aurelia-fetch-client';

export class WebAPI {
  static inject = [HttpClient];

  isRequesting = false;

  constructor(http) {
    http.configure(config => {
      config
        .withBaseUrl('http://localhost:9001/')
        .withDefaults({
          headers: {
            'Accept': 'application/json'
          }
        });
    });

    this.http = http;
  }

  getProductList() {
    this.isRequesting = true;
    return new Promise(resolve => {
        let results = this.http.fetch('api/products')
          .then(response => response.json())
          .then(data => {
            return data.map(x => { return {
              id: x.id,
              name: x.name,
              description: x.description,
              imgUrl: x.imgUrl,
              price: (x.price.dollars + "." + x.price.cents)
            }});
          });
        resolve(results);
        this.isRequesting = false;      
    });
  }

  placeOrder(data) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = {
          orderId: "KJHDNSF7SDAF87",
          success: true
        };
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getOrder(id) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = {
          shippingInfo: shippingInfo,
          items: items,
          totals: totals,
          email: "joe@smith.com"
        };
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }
}
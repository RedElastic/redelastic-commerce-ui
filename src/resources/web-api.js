import { HttpClient, json } from 'aurelia-fetch-client';

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
          return data.map(x => {
            return {
              id: x.id,
              name: x.name,
              description: x.description,
              imgUrl: x.imgUrl,
              price: (x.price.dollars + "." + x.price.cents)
            }
          });
        });
      resolve(results);
      this.isRequesting = false;
    });
  }

  placeOrder(data) {
    this.isRequesting = true;
    return new Promise(resolve => {
      let results = this.http.fetch('api/order', {
        method: 'post',
        body: json(data)
      }).then(response => response.json());      
      resolve(results);
      this.isRequesting = false;
    });
  }

  updateCart(userId, cartItems) {    
    let cart = [];    
    
    Array.from(cartItems.keys()).forEach(function (key) {
      cart.push({
        "productId" : key,
        "quantity" : cartItems.get(key).quantity,
        "price" : cartItems.get(key).price
      });
    });

    let b = {
      "userId" : userId,
      "items" : cart
    };

    this.http.fetch('api/cart', {
      method: 'put',
      body: json(b)
    })
  }

  getCart(userId) {
    this.isRequesting = true;
    return new Promise(resolve => {
      let results = this.http.fetch('api/cart?userId=' + userId)
        .then(response => response.json())
        .then(data => {
          return data.map(x => {
            return {
              key: x.productId,
              value: {
                name: x.name,
                description: x.description,
                quantity: x.quantity,
                price: x.price
              }              
            }
          });
        });
      resolve(results);
      this.isRequesting = false;
    });
  }  

  getOrder(id) {
    this.isRequesting = true;
    return new Promise(resolve => {
      let results = this.http.fetch('api/order/' + id)
        .then(response => response.json())
        .then(data => {
          return {
            shippingInfo: data.shippingInfo,
            items: data.items,
            orderTotals: data.totals
          }
        });
      resolve(results);
      this.isRequesting = false;
    });
  }

  getProduct(id) {
    this.isRequesting = true;
    return new Promise(resolve => {
      let results = this.http.fetch('api/product/' + id)
        .then(response => response.json());
      resolve(results);
      this.isRequesting = false;
    });
  }
}
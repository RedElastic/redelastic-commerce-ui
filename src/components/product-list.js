import {WebAPI} from '../resources/web-api';

export class ProductList {
  static inject = [WebAPI];

  constructor(api){
    this.api = api;
    this.products = [];
  }

  created(){
    this.api.getProductList().then(products => this.products = products);
  }
}
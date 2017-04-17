import {WebAPI} from '../resources/web-api';

export class Confirm {   
  static inject = [WebAPI];   

  constructor(api) {
    this.api = api;
  }

  // Implement this hook if you want to perform custom logic just before your view-model is displayed. 
  // You can optionally return a promise to tell the router to wait to bind and attach the view until after you finish your work.
  activate(params) {
    this.id = params.id;
    this.api.getOrder(params.id).then(results => {      
        this.email = results.email;
        this.shippingInfo = results.shippingInfo;
        this.items = results.items;
        this.totals = results.totals;      
    });    
  }
}

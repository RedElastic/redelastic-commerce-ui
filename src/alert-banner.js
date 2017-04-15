import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ProductAddedToCart, ProductAlreadyInCart} from './messages';

export class AlertBanner { 

  static inject = [EventAggregator];

  constructor(ea) {
    this.enabled = false;
    this.message = "";
    this.alertType = "";    
    this.ea = ea;

    ea.subscribe(ProductAddedToCart, msg => {
      this.message = "Product ID " + msg.id + " was added to your cart.";
      this.flashAlert("uk-alert-success");
    });

    ea.subscribe(ProductAlreadyInCart, msg => {
      this.message = "Product ID " + msg.id + " is already in your cart.";
      this.flashAlert("uk-alert-warning");
    });
  }

  flashAlert(alertType){
    this.enabled = true;
    this.alertType = alertType;
    setTimeout(() => { this.enabled = false; }, 2000);
  }
}
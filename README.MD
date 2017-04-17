# ReCommerce UI

This is a single-page app developed in [Aurelia](aurelia.io) that simulates a basic eCommerce user flow:

1. Browse items
2. Add to cart
3. Visit cart
  - Change quantity
  - Remove items
4. Checkout
5. Confirmation

This application can either be used stand-alone with fake data or connected to the [ReCommerce API gateway](https://github.com/RedElastic/redelastic-commerce).

## Installing

1. First install Aurelia's CLI from npm: `npm install -g aurelia-cli`
2. Install the following dependencies from npm:
  - numeral.js: `npm install numeral`
  - aurelia-validation: `npm install aurelia-validation --save`
3. Clone this repo
4. Execute `au run` to demo it
  - To make changes and have the app auto-reload execute `au run --watch`

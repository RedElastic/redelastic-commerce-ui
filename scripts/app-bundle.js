define('app',['exports', 'aurelia-router'], function (exports, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var App = exports.App = (_temp = _class = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'ReCommerce';
      config.map([{ route: ['', 'home'], name: 'home', moduleId: 'home/home' }, { route: 'cart', name: 'cart', moduleId: 'cart/cart' }, { route: 'cart/checkout', name: 'checkout', moduleId: 'cart/checkout' }]);
    };

    return App;
  }(), _class.inject = [_aureliaRouter.RouterConfiguration, _aureliaRouter.Router], _temp);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('components/alert-banner',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../resources/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AlertBanner = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var AlertBanner = exports.AlertBanner = (_temp = _class = function () {
    function AlertBanner(ea) {
      var _this = this;

      _classCallCheck(this, AlertBanner);

      this.enabled = false;
      this.message = "";
      this.alertType = "";
      this.ea = ea;

      ea.subscribe(_messages.ProductAddedToCart, function (msg) {
        _this.message = msg.data.name + " was added to your cart.";
        _this.flashAlert("uk-alert-success");
      });

      ea.subscribe(_messages.ProductAlreadyInCart, function (msg) {
        _this.message = msg.data.name + " is already in your cart.";
        _this.flashAlert("uk-alert-warning");
      });
    }

    AlertBanner.prototype.flashAlert = function flashAlert(alertType) {
      var _this2 = this;

      this.enabled = true;
      this.alertType = alertType;
      setTimeout(function () {
        _this2.enabled = false;
      }, 2000);
    };

    return AlertBanner;
  }(), _class.inject = [_aureliaEventAggregator.EventAggregator], _temp);
});
define('components/navigation',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../resources/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Navigation = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _class2, _temp;

  var Navigation = exports.Navigation = (_class = (_temp = _class2 = function Navigation(ea) {
    var _this = this;

    _classCallCheck(this, Navigation);

    _initDefineProp(this, 'router', _descriptor, this);

    this.ea = ea;
    this.cartCount = 0;

    ea.subscribe(_messages.ShoppingCartQuantityUpdated, function (msg) {
      _this.cartCount = msg.quantity;
    });
  }, _class2.inject = [_aureliaEventAggregator.EventAggregator], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'router', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('components/product-card',['exports', 'aurelia-framework', '../cart/cart'], function (exports, _aureliaFramework, _cart) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProductCard = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class2, _temp;

  var ProductCard = exports.ProductCard = (_class = (_temp = _class2 = function () {
    function ProductCard(cart) {
      _classCallCheck(this, ProductCard);

      _initDefineProp(this, 'id', _descriptor, this);

      _initDefineProp(this, 'name', _descriptor2, this);

      _initDefineProp(this, 'description', _descriptor3, this);

      _initDefineProp(this, 'price', _descriptor4, this);

      this.quantity = 1;

      this.cart = cart;
    }

    ProductCard.prototype.addToCart = function addToCart() {
      var data = {
        name: this.name,
        description: this.description,
        quantity: this.quantity,
        price: this.price
      };
      this.cart.addToCart(this.id, data);
    };

    ProductCard.prototype.increaseQuantity = function increaseQuantity() {
      this.quantity++;
    };

    ProductCard.prototype.decreaseQuantity = function decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    };

    return ProductCard;
  }(), _class2.inject = [_cart.Cart], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'id', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'name', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'description', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'price', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('components/product-list',['exports', '../resources/web-api'], function (exports, _webApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProductList = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var ProductList = exports.ProductList = (_temp = _class = function () {
    function ProductList(api) {
      _classCallCheck(this, ProductList);

      this.api = api;
      this.products = [];
    }

    ProductList.prototype.created = function created() {
      var _this = this;

      this.api.getProductList().then(function (products) {
        return _this.products = products;
      });
    };

    return ProductList;
  }(), _class.inject = [_webApi.WebAPI], _temp);
});
define('home/home',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Home = exports.Home = function Home() {
    _classCallCheck(this, Home);

    this.message = 'Products';
  };
});
define('cart/cart-item',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../resources/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CartItem = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class2, _temp;

  var CartItem = exports.CartItem = (_class = (_temp = _class2 = function () {
    function CartItem(ea) {
      var _this = this;

      _classCallCheck(this, CartItem);

      _initDefineProp(this, 'id', _descriptor, this);

      _initDefineProp(this, 'name', _descriptor2, this);

      _initDefineProp(this, 'quantity', _descriptor3, this);

      _initDefineProp(this, 'price', _descriptor4, this);

      this.ea = ea;
      this.subtotal = 0;

      ea.subscribe(_messages.ProductAddedToCart, function (msg) {
        _this.recomputeSubtotal();
      });
    }

    CartItem.prototype.attached = function attached() {
      this.recomputeSubtotal();
    };

    CartItem.prototype.recomputeSubtotal = function recomputeSubtotal() {
      this.subtotal = this.quantity * this.price;
    };

    CartItem.prototype.removeFromCart = function removeFromCart() {
      this.ea.publish(new _messages.ProductRemovedFromCart(this.id));
      this.recomputeSubtotal();
    };

    CartItem.prototype.decreaseQuantity = function decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
        this.ea.publish(new _messages.CartItemQuantityUpdated(this.id, this.quantity));
        this.recomputeSubtotal();
      }
    };

    CartItem.prototype.increaseQuantity = function increaseQuantity() {
      this.quantity++;
      this.ea.publish(new _messages.CartItemQuantityUpdated(this.id, this.quantity));
      this.recomputeSubtotal();
    };

    return CartItem;
  }(), _class2.inject = [_aureliaEventAggregator.EventAggregator], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'id', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'name', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'quantity', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'price', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('cart/cart',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../resources/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Cart = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _class2, _temp;

  var Cart = exports.Cart = (_class = (_temp = _class2 = function () {
    function Cart(ea) {
      var _this = this;

      _classCallCheck(this, Cart);

      _initDefineProp(this, 'items', _descriptor, this);

      this.ea = ea;
      this.taxes = 0;
      this.shipping = 0;
      this.total = 0;
      this.subtotal = 0;

      ea.subscribe(_messages.ProductRemovedFromCart, function (msg) {
        _this.items.delete(msg.id);
        _this.ea.publish(new _messages.ShoppingCartQuantityUpdated(_this.items.size));
        _this.recomputeTotals();
      });

      ea.subscribe(_messages.ProductAddedToCart, function (msg) {
        _this.recomputeTotals();
      });

      ea.subscribe(_messages.CartItemQuantityUpdated, function (msg) {
        var data = _this.items.get(msg.id);
        data.quantity = msg.quantity;
        _this.items.set(msg.id, data);
        _this.recomputeTotals();
      });
    }

    Cart.prototype.attached = function attached() {
      this.recomputeTotals();
    };

    Cart.prototype.addToCart = function addToCart(id, data) {
      if (this.items.has(id)) {
        this.ea.publish(new _messages.ProductAlreadyInCart(id, data));
      } else {
        this.items.set(id, data);
        this.ea.publish(new _messages.ShoppingCartQuantityUpdated(this.items.size));
        this.ea.publish(new _messages.ProductAddedToCart(id, data));
      }
    };

    Cart.prototype.recomputeTotals = function recomputeTotals() {
      var subtotal = 0;
      for (var _iterator = this.items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var _ref2 = _ref,
            id = _ref2[0],
            data = _ref2[1];

        subtotal = subtotal + data.price * data.quantity;
      }
      this.subtotal = subtotal;
      this.taxes = this.subtotal * 0.13;
      this.total = this.subtotal + this.taxes;
    };

    return Cart;
  }(), _class2.inject = [_aureliaEventAggregator.EventAggregator], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'items', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: function initializer() {
      return new Map();
    }
  })), _class);
});
define('cart/checkout',['exports', './cart'], function (exports, _cart) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Checkout = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Checkout = exports.Checkout = (_temp = _class = function () {
    function Checkout(cart) {
      _classCallCheck(this, Checkout);

      this.cart = cart;
    }

    Checkout.prototype.getCartSize = function getCartSize() {
      return this.cart.items.size;
    };

    return Checkout;
  }(), _class.inject = [_cart.Cart], _temp);
});
define('resources/currency-format',['exports', 'numeral'], function (exports, _numeral) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CurrencyFormatValueConverter = undefined;

  var _numeral2 = _interopRequireDefault(_numeral);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CurrencyFormatValueConverter = exports.CurrencyFormatValueConverter = function () {
    function CurrencyFormatValueConverter() {
      _classCallCheck(this, CurrencyFormatValueConverter);
    }

    CurrencyFormatValueConverter.prototype.toView = function toView(value) {
      return (0, _numeral2.default)(value).format('($0,0.00)');
    };

    return CurrencyFormatValueConverter;
  }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ShoppingCartQuantityUpdated = exports.ShoppingCartQuantityUpdated = function ShoppingCartQuantityUpdated(quantity) {
    _classCallCheck(this, ShoppingCartQuantityUpdated);

    this.quantity = quantity;
  };

  var CartItemQuantityUpdated = exports.CartItemQuantityUpdated = function CartItemQuantityUpdated(id, quantity) {
    _classCallCheck(this, CartItemQuantityUpdated);

    this.id = id;
    this.quantity = quantity;
  };

  var ProductAddedToCart = exports.ProductAddedToCart = function ProductAddedToCart(id, data) {
    _classCallCheck(this, ProductAddedToCart);

    this.id = id;
    this.data = data;
  };

  var ProductAlreadyInCart = exports.ProductAlreadyInCart = function ProductAlreadyInCart(id, data) {
    _classCallCheck(this, ProductAlreadyInCart);

    this.id = id;
    this.data = data;
  };

  var ProductRemovedFromCart = exports.ProductRemovedFromCart = function ProductRemovedFromCart(id) {
    _classCallCheck(this, ProductRemovedFromCart);

    this.id = id;
  };
});
define('resources/web-api',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var latency = 200;

  var products = [{
    id: "1",
    name: 'Radical Coffee Maker',
    description: 'The best coffee maker your ass will ever own',
    imgUrl: '',
    price: 42.50
  }, {
    id: "2",
    name: 'The Worst Shit Ever',
    description: 'The worst coffee maker your ass will ever own',
    imgUrl: '',
    price: 12.99
  }, {
    id: "3",
    name: 'Some Gnarly Product',
    description: 'You dont want to use this thing or buy it or nothing',
    imgUrl: '',
    price: 0.99
  }, {
    id: "4",
    name: 'Stupid Coffee Maker',
    description: 'Tries to make tea, doesn\'t understand its place in the world',
    imgUrl: '',
    price: 66.60
  }, {
    id: "5",
    name: 'Tub of Butter',
    description: 'I don\'t think you\'re ready for this jelly',
    imgUrl: '',
    price: 900.00
  }];

  var WebAPI = exports.WebAPI = function () {
    function WebAPI() {
      _classCallCheck(this, WebAPI);

      this.isRequesting = false;
    }

    WebAPI.prototype.getProductList = function getProductList() {
      var _this = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var results = products.map(function (x) {
            return {
              id: x.id,
              name: x.name,
              description: x.description,
              imgUrl: x.imgUrl,
              price: x.price
            };
          });
          resolve(results);
          _this.isRequesting = false;
        }, latency);
      });
    };

    WebAPI.prototype.getProductDetails = function getProductDetails(id) {
      var _this2 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var found = contacts.filter(function (x) {
            return x.id == id;
          })[0];
          resolve(JSON.parse(JSON.stringify(found)));
          _this2.isRequesting = false;
        }, latency);
      });
    };

    return WebAPI;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./components/alert-banner\"></require><require from=\"./components/navigation\"></require><require from=\"./components/footer.html\"></require><navigation router.bind=\"router\"></navigation><alert-banner></alert-banner><router-view></router-view><footer></footer></template>"; });
define('text!cart/cart-item.html', ['module'], function(module) { module.exports = "<template><require from=\"../resources/currency-format\"></require><div class=\"uk-margin-medium-bottom\"><h3 class=\"uk-margin-small-bottom\">${name}</h3><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Quantity</div><div><span>${quantity}</span></div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Price (each)</div><div>${price | currencyFormat}</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Price (subtotal)</div><div>${subtotal | currencyFormat}</div></div><div class=\"uk-margin-small-top\" uk-grid><div class=\"uk-width-1-2\"><button class=\"uk-button uk-button-small uk-button-default\" click.delegate=\"decreaseQuantity()\">-</button> <button class=\"uk-button uk-button-small uk-button-default\" click.delegate=\"increaseQuantity()\">+</button></div><div class=\"uk-width-1-2 uk-text-right\"><button class=\"uk-button uk-button-small uk-button-danger\" click.delegate=\"removeFromCart()\">x</button></div></div></div></template>"; });
define('text!cart/cart.html', ['module'], function(module) { module.exports = "<template><require from=\"../resources/currency-format\"></require><require from=\"./cart-item\"></require><div class=\"uk-section uk-padding-large uk-section-default\"><div class=\"uk-container\"><div uk-grid><div class=\"uk-width-2-3\"><div class=\"uk-card uk-card-body uk-card-default\"><h1 class=\"uk-heading-line uk-text-center\"><span>Cart</span></h1><div class=\"uk-margin-medium\"><cart-item id.bind=\"id\" name.bind=\"data.name\" quantity.bind=\"data.quantity\" price.bind=\"data.price\" repeat.for=\"[id, data] of items\"></cart-item></div></div></div><div class=\"uk-width-1-3\"><div class=\"uk-card uk-card-body uk-card-primary\"><h3>Your Order</h3><div id=\"totals\" class=\"uk-margin-medium-bottom\"><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Subtotal</div><div>${subtotal | currencyFormat}</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Taxes (13%)</div><div>${taxes | currencyFormat}</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Shipping</div><div>¯\\_(ツ)_/¯</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Total</div><div>${total | currencyFormat}</div></div></div><a route-href=\"route: checkout\" class=\"uk-button uk-width-1-1 uk-button-primary\">Checkout</a></div></div></div></div></div></template>"; });
define('text!cart/checkout.html', ['module'], function(module) { module.exports = "<template><require from=\"../resources/currency-format\"></require><div class=\"uk-section uk-padding-large uk-section-default\"><div class=\"uk-container\"><div uk-grid><div class=\"uk-width-2-3\"><div class=\"uk-card uk-card-body uk-card-default\"><h2 class=\"uk-heading-line uk-text-center\"><span>Shipping Address</span></h2><div class=\"uk-margin-medium\"><form uk-grid><div class=\"uk-width-1-2\"><label class=\"uk-form-label\" for=\"first-name\">First Name</label><div class=\"uk-form-controls\"><input class=\"uk-input\" id=\"first-name\" type=\"text\" placeholder=\"\"></div></div><div class=\"uk-width-1-2\"><label class=\"uk-form-label\" for=\"last-name\">Last Name</label><div class=\"uk-form-controls\"><input class=\"uk-input\" id=\"last-name\" type=\"text\" placeholder=\"\"></div></div><div class=\"uk-width-2-3\"><label class=\"uk-form-label\" for=\"email\">Email Address</label><div class=\"uk-form-controls\"><input class=\"uk-input\" id=\"email\" type=\"text\" placeholder=\"\"></div></div><div class=\"uk-width-1-2\"><label class=\"uk-form-label\" for=\"country\">Country</label><div class=\"uk-form-controls\"><select class=\"uk-select\" id=\"country\"><option>Canada</option></select></div></div><div class=\"uk-width-1-2\"><label class=\"uk-form-label\" for=\"country\">Province</label><div class=\"uk-form-controls\"><select class=\"uk-select\" id=\"country\"><option>Alberta</option><option>British Columbia</option><option>Manitoba</option><option>New Brunswick</option><option>Newfoundland and Labrador</option><option>Northwest Territories</option><option>Nova Scotia</option><option>Nunavut</option><option>Ontario</option><option>Prince Edward Island</option><option>Quebec</option><option>Saskatchewan</option><option>Yukon</option></select></div></div><div class=\"uk-width-1-2\"><label class=\"uk-form-label\" for=\"country\">City</label><div class=\"uk-form-controls\"><input class=\"uk-input\" id=\"city\" type=\"text\" placeholder=\"\"></div></div><div class=\"uk-width-1-2\"><label class=\"uk-form-label\" for=\"country\">Postal Code</label><div class=\"uk-form-controls\"><input class=\"uk-input\" id=\"city\" type=\"text\" placeholder=\"\"></div></div></form></div><a class=\"uk-button uk-button-primary uk-width-1-1 uk-margin-medium-top\">Pay & Checkout</a><p class=\"uk-text-small uk-text-center\">In demo land, everything is free! No need to enter your credit card details.</p></div></div><div class=\"uk-width-1-3\"><div class=\"uk-card uk-card-body uk-card-primary\"><h3>Your Order</h3><div id=\"totals\" class=\"uk-margin-medium-bottom\"><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Subtotal</div><div>${cart.subtotal | currencyFormat}</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Taxes (13%)</div><div>${cart.taxes | currencyFormat}</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Shipping</div><div>¯\\_(ツ)_/¯</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Total</div><div>${cart.total | currencyFormat}</div></div></div></div></div></div></div></div></template>"; });
define('text!components/alert-banner.html', ['module'], function(module) { module.exports = "<template><div show.bind=\"enabled\" class=\"uk-card uk-card-body uk-position-top-right uk-position-fixed\" style=\"z-index:980;width:500px;top:60px\"><div class=\"${alertType} uk-box-shadow-medium\" uk-alert><a class=\"uk-alert-close\" uk-close></a><p>${message}</p></div></div></template>"; });
define('text!components/footer.html', ['module'], function(module) { module.exports = "<template><div class=\"uk-section uk-padding-large uk-section-secondary\"><div class=\"uk-container uk-text-center\">A demo by your friends at RedElastic.</div></div></template>"; });
define('text!components/navigation.html', ['module'], function(module) { module.exports = "<template><nav class=\"uk-navbar-container\" uk-navbar><div class=\"uk-navbar-center\"><div class=\"uk-navbar-left\"><ul class=\"uk-navbar-nav\"><li><a href=\"#\">Account</a></li></ul></div><a route-href=\"route: home\" class=\"uk-navbar-item uk-logo\">ReCommerce</a><div class=\"uk-navbar-right\"><ul class=\"uk-navbar-nav\"><li><a route-href=\"route: cart\" uk-icon=\"icon: cart\"><span class=\"uk-badge\">${cartCount}</span></a></li></ul></div></div></nav></template>"; });
define('text!components/product-card.html', ['module'], function(module) { module.exports = "<template><require from=\"../resources/currency-format\"></require><div class=\"uk-card uk-card-body uk-card-default product-card\"><div class=\"uk-card-media-top\"><img width=\"600\" height=\"400\" src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNjAwcHgiIGhlaWdodD0iNDAwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2MDAgNDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IGZpbGw9IiNGNUY1RjUiIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIi8+DQo8ZyBvcGFjaXR5PSIwLjciPg0KCTxwYXRoIGZpbGw9IiNEOEQ4RDgiIGQ9Ik0yMjguMTg0LDE0My41djExM2gxNDMuNjMydi0xMTNIMjI4LjE4NHogTTM2MC4yNDQsMjQ0LjI0N0gyNDAuNDM3di04OC40OTRoMTE5LjgwOEwzNjAuMjQ0LDI0NC4yNDcNCgkJTDM2MC4yNDQsMjQ0LjI0N3oiLz4NCgk8cG9seWdvbiBmaWxsPSIjRDhEOEQ4IiBwb2ludHM9IjI0Ni44ODEsMjM0LjcxNyAyNzEuNTcyLDIwOC43NjQgMjgwLjgyNCwyMTIuNzY4IDMxMC4wMTYsMTgxLjY4OCAzMjEuNTA1LDE5NS40MzQgDQoJCTMyNi42ODksMTkyLjMwMyAzNTQuNzQ2LDIzNC43MTcgCSIvPg0KCTxjaXJjbGUgZmlsbD0iI0Q4RDhEOCIgY3g9IjI3NS40MDUiIGN5PSIxNzguMjU3IiByPSIxMC43ODciLz4NCjwvZz4NCjwvc3ZnPg0K\" alt=\"\"></div><h3 class=\"uk-card-title uk-margin-small-top uk-margin-small-bottom\">${name}</h3><p class=\"uk-text-small\">${price | currencyFormat}</p><div class=\"uk-margin-small-top\">${description}</div></div><button click.delegate=\"addToCart()\" class=\"uk-button uk-button-primary uk-width-1-1\">Add to Cart</button><div class=\"uk-child-width-1-3 uk-grid-collapse uk-margin-top\" uk-grid><div class=\"uk-text-left uk-margin-remove\"><button click.delegate=\"decreaseQuantity()\" class=\"uk-button uk-button-small uk-button-default\">-</button></div><div class=\"uk-text-left uk-text-small uk-margin-remove\">Quantity: <span class=\"uk-text-bold\">${quantity}</span></div><div class=\"uk-text-right uk-margin-remove\"><button click.delegate=\"increaseQuantity()\" class=\"uk-button uk-button-small uk-button-default\">+</button></div></div></template>"; });
define('text!components/product-list.html', ['module'], function(module) { module.exports = "<template><require from=\"./product-card\"></require><div class=\"product-list uk-grid-large\" uk-grid uk-height-match=\"target: > div > .product-card\"><div repeat.for=\"product of products\" class=\"uk-width-1-2@s uk-width-1-3@m\"><product-card id=\"${product.id}\" name=\"${product.name}\" description=\"${product.description}\" price=\"${product.price}\"></product-card></div></div></template>"; });
define('text!home/home.html', ['module'], function(module) { module.exports = "<template><require from=\"../components/product-list\"></require><div class=\"uk-section uk-padding-large uk-section-default\"><div class=\"uk-container\"><h1 class=\"uk-heading-line\"><span>${message}</span></h1><product-list></product-list></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map
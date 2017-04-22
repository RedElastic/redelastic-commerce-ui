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
      config.map([{ route: ['', 'home'], name: 'home', moduleId: 'home/home' }, { route: 'cart', name: 'cart', moduleId: 'cart/cart' }, { route: 'cart/checkout', name: 'checkout', moduleId: 'cart/checkout' }, { route: 'cart/checkout/confirm/:id', name: 'confirm', moduleId: 'cart/confirm' }]);
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
    aurelia.use.standardConfiguration().plugin('aurelia-validation').feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging().plugin('aurelia-validation');
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('cart/cart-item',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../events/cart-events'], function (exports, _aureliaFramework, _aureliaEventAggregator, _cartEvents) {
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

      ea.subscribe(_cartEvents.ProductAddedToCart, function (msg) {
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
      this.ea.publish(new _cartEvents.ProductRemovedFromCart(this.id));
      this.recomputeSubtotal();
    };

    CartItem.prototype.decreaseQuantity = function decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
        this.ea.publish(new _cartEvents.ProductQuantityChanged(this.id, this.quantity));
        this.recomputeSubtotal();
      }
    };

    CartItem.prototype.increaseQuantity = function increaseQuantity() {
      this.quantity++;
      this.ea.publish(new _cartEvents.ProductQuantityChanged(this.id, this.quantity));
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
define('cart/cart',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../resources/web-api', '../events/cart-events'], function (exports, _aureliaFramework, _aureliaEventAggregator, _webApi, _cartEvents) {
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
    function Cart(ea, api) {
      var _this = this;

      _classCallCheck(this, Cart);

      _initDefineProp(this, 'items', _descriptor, this);

      this.ea = ea;
      this.api = api;
      this.taxes = 0;
      this.shipping = 0;
      this.total = 0;
      this.subtotal = 0;

      ea.subscribe(_cartEvents.ProductRemovedFromCart, function (msg) {
        _this.removeFromCart(msg.id);
      });

      ea.subscribe(_cartEvents.ProductQuantityChanged, function (msg) {
        _this.changeQuantity(msg.id, msg.quantity);
      });

      if (window.localStorage.getItem("userId") === null) {
        window.localStorage.setItem("userId", 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        }));
      }

      this.reloadCartFromServer();
    }

    Cart.prototype.activate = function activate() {
      this.recomputeTotals();
    };

    Cart.prototype.reloadCartFromServer = function reloadCartFromServer() {
      var _this2 = this;

      this.api.getCart(window.localStorage.getItem("userId")).then(function (cart) {
        var newCart = new Map();
        cart.forEach(function (item) {
          newCart.set(item.key, item.value);
        });
        _this2.items = newCart;
        _this2.ea.publish(new _cartEvents.CartUniqueItemsCountChanged(_this2.items.size));
        _this2.recomputeTotals();
      });
    };

    Cart.prototype.addToCart = function addToCart(id, data) {
      console.debug(data);
      if (this.items.has(id)) {
        this.ea.publish(new _cartEvents.ProductAlreadyInCart(id, data));
      } else {
        this.items.set(id, data);
        this.ea.publish(new _cartEvents.ProductAddedToCart(id, data));
        this.cartChanged();
      }
    };

    Cart.prototype.removeFromCart = function removeFromCart(id) {
      this.items.delete(id);
      this.cartChanged();
    };

    Cart.prototype.changeQuantity = function changeQuantity(id, quantity) {
      var data = this.items.get(id);
      data.quantity = quantity;
      this.items.set(id, data);
      this.cartChanged();
    };

    Cart.prototype.cartChanged = function cartChanged() {
      console.debug(this.items);
      this.ea.publish(new _cartEvents.CartUniqueItemsCountChanged(this.items.size));
      this.api.updateCart(window.localStorage.getItem("userId"), this.items);
      this.recomputeTotals();
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
  }(), _class2.inject = [_aureliaEventAggregator.EventAggregator, _webApi.WebAPI], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'items', [_aureliaFramework.observable], {
    enumerable: true,
    initializer: function initializer() {
      return new Map();
    }
  })), _class);
});
define('cart/checkout',['exports', './cart', 'aurelia-validation', 'aurelia-router', '../resources/web-api'], function (exports, _cart, _aureliaValidation, _aureliaRouter, _webApi) {
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
    function Checkout(cart, validator, router, api) {
      _classCallCheck(this, Checkout);

      this.countries = ['Canada'];
      this.provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'];

      this.cart = cart;
      this.validator = validator;
      this.router = router;
      this.api = api;

      _aureliaValidation.ValidationRules.ensure(function (c) {
        return c.firstName;
      }).required().ensure(function (c) {
        return c.lastName;
      }).required().ensure(function (c) {
        return c.email;
      }).required().email().ensure(function (c) {
        return c.phone;
      }).required().ensure(function (c) {
        return c.street;
      }).required().ensure(function (c) {
        return c.city;
      }).required().ensure(function (c) {
        return c.postalCode;
      }).required().on(this);
    }

    Checkout.prototype.getCartSize = function getCartSize() {
      return this.cart.items.size;
    };

    Checkout.prototype.submit = function submit() {
      var _this = this;

      this.validator.validate().then(function (result) {
        if (result.valid) {
          var shippingInfo = {
            firstName: _this.firstName,
            lastName: _this.lastName,
            emailAddress: _this.emailAddress,
            phone: _this.phone,
            street: _this.street,
            apartment: _this.apartment,
            country: _this.country,
            province: _this.province,
            city: _this.city,
            postalCode: _this.postalCode
          };

          var items = Array.from(_this.cart.items).map(function (_ref) {
            var key = _ref[0],
                value = _ref[1];
            return {
              "productId": key,
              "quantity": value.quantity,
              "price": value.price,
              "subtotal": value.price * value.quantity
            };
          });

          var order = {
            shippingInfo: shippingInfo,
            items: items
          };

          _this.api.placeOrder(order).then(function (uuid) {
            _this.api.deleteCart(window.localStorage.getItem("userId")).then(function (x) {
              _this.cart.reloadCartFromServer();
              _this.router.navigateToRoute("confirm", { id: uuid });
            });
          });
        }
      });
    };

    return Checkout;
  }(), _class.inject = [_cart.Cart, _aureliaValidation.ValidationController, _aureliaRouter.Router, _webApi.WebAPI], _temp);
});
define('cart/confirm',['exports', '../resources/web-api'], function (exports, _webApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Confirm = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Confirm = exports.Confirm = (_temp = _class = function () {
    function Confirm(api) {
      _classCallCheck(this, Confirm);

      this.api = api;
    }

    Confirm.prototype.activate = function activate(params) {
      var _this = this;

      this.id = params.id;
      this.api.getOrder(params.id).then(function (results) {
        _this.shippingInfo = results.shippingInfo;
        _this.items = results.items;
        _this.totals = results.orderTotals;
        console.debug(_this.shippingInfo);
      });
    };

    return Confirm;
  }(), _class.inject = [_webApi.WebAPI], _temp);
});
define('components/alert-banner',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../events/cart-events'], function (exports, _aureliaFramework, _aureliaEventAggregator, _cartEvents) {
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

      ea.subscribe(_cartEvents.ProductAddedToCart, function (msg) {
        _this.message = msg.data.name + " was added to your cart.";
        _this.flashAlert("uk-alert-success");
      });

      ea.subscribe(_cartEvents.ProductAlreadyInCart, function (msg) {
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
define('components/navigation',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../events/cart-events'], function (exports, _aureliaFramework, _aureliaEventAggregator, _cartEvents) {
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

    ea.subscribe(_cartEvents.CartUniqueItemsCountChanged, function (msg) {
      _this.cartCount = msg.count;
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

  var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class2, _temp;

  var ProductCard = exports.ProductCard = (_class = (_temp = _class2 = function () {
    function ProductCard(cart) {
      _classCallCheck(this, ProductCard);

      _initDefineProp(this, 'id', _descriptor, this);

      _initDefineProp(this, 'name', _descriptor2, this);

      _initDefineProp(this, 'description', _descriptor3, this);

      _initDefineProp(this, 'price', _descriptor4, this);

      _initDefineProp(this, 'img', _descriptor5, this);

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
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'img', [_aureliaFramework.bindable], {
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
define('events/cart-events',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ProductQuantityChanged = exports.ProductQuantityChanged = function ProductQuantityChanged(id, quantity) {
    _classCallCheck(this, ProductQuantityChanged);

    this.id = id;
    this.quantity = quantity;
  };

  var ProductRemovedFromCart = exports.ProductRemovedFromCart = function ProductRemovedFromCart(id) {
    _classCallCheck(this, ProductRemovedFromCart);

    this.id = id;
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

  var CartUniqueItemsCountChanged = exports.CartUniqueItemsCountChanged = function CartUniqueItemsCountChanged(count) {
    _classCallCheck(this, CartUniqueItemsCountChanged);

    this.count = count;
  };
});
define('events/order-events',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var OrderConfirmed = exports.OrderConfirmed = function OrderConfirmed(id, shippingInfo, items) {
    _classCallCheck(this, OrderConfirmed);

    this.id = id;
    this.shippingInfo;
    this.items;
  };
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
define('resources/web-api',['exports', 'aurelia-fetch-client'], function (exports, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WebAPI = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var WebAPI = exports.WebAPI = (_temp = _class = function () {
    function WebAPI(http) {
      _classCallCheck(this, WebAPI);

      this.isRequesting = false;

      http.configure(function (config) {
        config.withBaseUrl('http://localhost:9001/').withDefaults({
          headers: {
            'Accept': 'application/json'
          }
        });
      });

      this.http = http;
    }

    WebAPI.prototype.getProductList = function getProductList() {
      var _this = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        var results = _this.http.fetch('api/products').then(function (response) {
          return response.json();
        }).then(function (data) {
          return data.map(function (x) {
            return {
              id: x.id,
              name: x.name,
              description: x.description,
              imgUrl: x.imgUrl,
              price: x.price.dollars + "." + x.price.cents
            };
          });
        });
        resolve(results);
        _this.isRequesting = false;
      });
    };

    WebAPI.prototype.placeOrder = function placeOrder(data) {
      var _this2 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        var results = _this2.http.fetch('api/order', {
          method: 'post',
          body: (0, _aureliaFetchClient.json)(data)
        }).then(function (response) {
          return response.json();
        });
        resolve(results);
        _this2.isRequesting = false;
      });
    };

    WebAPI.prototype.updateCart = function updateCart(userId, cartItems) {
      var cart = [];

      Array.from(cartItems.keys()).forEach(function (key) {
        cart.push({
          "productId": key,
          "quantity": cartItems.get(key).quantity,
          "price": cartItems.get(key).price
        });
      });

      var b = {
        "userId": userId,
        "items": cart
      };

      this.http.fetch('api/cart', {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(b)
      });
    };

    WebAPI.prototype.getCart = function getCart(userId) {
      var _this3 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        var results = _this3.http.fetch('api/cart?userId=' + userId).then(function (response) {
          return response.json();
        }).then(function (data) {
          return data.map(function (x) {
            return {
              key: x.productId,
              value: {
                name: x.name,
                description: x.description,
                quantity: x.quantity,
                price: x.price
              }
            };
          });
        });
        resolve(results);
        _this3.isRequesting = false;
      });
    };

    WebAPI.prototype.deleteCart = function deleteCart(userId) {
      var _this4 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        var results = _this4.http.fetch('api/cart?userId=' + userId, {
          method: 'delete'
        });
        resolve(results);
        _this4.isRequesting = false;
      });
    };

    WebAPI.prototype.getOrder = function getOrder(id) {
      var _this5 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        var results = _this5.http.fetch('api/order/' + id).then(function (response) {
          return response.json();
        }).then(function (data) {
          return {
            shippingInfo: data.shippingInfo,
            items: data.items,
            orderTotals: data.totals
          };
        });
        resolve(results);
        _this5.isRequesting = false;
      });
    };

    WebAPI.prototype.getProduct = function getProduct(id) {
      var _this6 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        var results = _this6.http.fetch('api/product/' + id).then(function (response) {
          return response.json();
        });
        resolve(results);
        _this6.isRequesting = false;
      });
    };

    return WebAPI;
  }(), _class.inject = [_aureliaFetchClient.HttpClient], _temp);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./components/alert-banner\"></require><require from=\"./components/navigation\"></require><require from=\"./components/footer.html\"></require><navigation router.bind=\"router\"></navigation><alert-banner></alert-banner><router-view></router-view><footer></footer></template>"; });
define('text!components/alert-banner.html', ['module'], function(module) { module.exports = "<template><div show.bind=\"enabled\" class=\"uk-card uk-card-body uk-position-top-right uk-position-fixed\" style=\"z-index:980;width:500px;top:60px\"><div class=\"${alertType} uk-box-shadow-medium\" uk-alert><a class=\"uk-alert-close\" uk-close></a><p>${message}</p></div></div></template>"; });
define('text!components/footer.html', ['module'], function(module) { module.exports = "<template><div class=\"uk-section uk-padding-large uk-section-secondary\"><div class=\"uk-container uk-text-center\">A demo by your friends at RedElastic.</div></div></template>"; });
define('text!components/navigation.html', ['module'], function(module) { module.exports = "<template><nav class=\"uk-navbar-container\" uk-navbar><div class=\"uk-navbar-center\"><div class=\"uk-navbar-left\"><ul class=\"uk-navbar-nav\"></ul></div><a route-href=\"route: home\" class=\"uk-navbar-item uk-logo\">ReCommerce</a><div class=\"uk-navbar-right\"><ul class=\"uk-navbar-nav\"><li><a route-href=\"route: cart\" uk-icon=\"icon: cart\"><span class=\"uk-badge\">${cartCount}</span></a></li></ul></div></div></nav></template>"; });
define('text!components/product-card.html', ['module'], function(module) { module.exports = "<template><require from=\"../resources/currency-format\"></require><div class=\"uk-card uk-card-body uk-card-default product-card\"><div class=\"uk-card-media-top\"><img width=\"600\" height=\"400\" src=\"${img}\" alt=\"\"></div><h3 class=\"uk-card-title uk-margin-small-top uk-margin-small-bottom\">${name}</h3><p class=\"uk-text-small\">${price | currencyFormat}</p><div class=\"uk-margin-small-top\">${description}</div></div><button click.delegate=\"addToCart()\" class=\"uk-button uk-button-primary uk-width-1-1\">Add to Cart</button><div class=\"uk-child-width-1-3 uk-grid-collapse uk-margin-top\" uk-grid><div class=\"uk-text-left uk-margin-remove\"><button click.delegate=\"decreaseQuantity()\" class=\"uk-button uk-button-small uk-button-default\">-</button></div><div class=\"uk-text-left uk-text-small uk-margin-remove\">Quantity: <span class=\"uk-text-bold\">${quantity}</span></div><div class=\"uk-text-right uk-margin-remove\"><button click.delegate=\"increaseQuantity()\" class=\"uk-button uk-button-small uk-button-default\">+</button></div></div></template>"; });
define('text!components/product-list.html', ['module'], function(module) { module.exports = "<template><require from=\"./product-card\"></require><div class=\"product-list uk-grid-large\" uk-grid uk-height-match=\"target: > div > .product-card\"><div repeat.for=\"product of products\" class=\"uk-width-1-2@s uk-width-1-3@m\"><product-card id=\"${product.id}\" name=\"${product.name}\" description=\"${product.description}\" price=\"${product.price}\" img=\"${product.imgUrl}\"></product-card></div></div></template>"; });
define('text!home/home.html', ['module'], function(module) { module.exports = "<template><require from=\"../components/product-list\"></require><div class=\"uk-section uk-padding-large uk-section-default\"><div class=\"uk-container\"><product-list></product-list></div></div></template>"; });
define('text!cart/cart-item.html', ['module'], function(module) { module.exports = "<template><require from=\"../resources/currency-format\"></require><div class=\"uk-margin-medium-bottom\"><div uk-grid><div class=\"uk-width-1-2\"><h3 class=\"uk-margin-small-bottom\">${name}</h3></div><div class=\"uk-width-1-2 uk-text-right\"><button class=\"uk-button uk-button-small uk-button-default\" click.delegate=\"decreaseQuantity()\">-</button> <button class=\"uk-button uk-button-small uk-button-default\" click.delegate=\"increaseQuantity()\">+</button></div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Quantity</div><div><span>${quantity}</span></div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Price (each)</div><div>${price | currencyFormat}</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Price (subtotal)</div><div>${subtotal | currencyFormat}</div></div><div class=\"uk-margin-small-top\" uk-grid><div class=\"uk-width-1-2\"></div><div class=\"uk-width-1-2 uk-text-right\"><button class=\"uk-button uk-button-small uk-button-danger\" click.delegate=\"removeFromCart()\">x</button></div></div></div></template>"; });
define('text!cart/cart.html', ['module'], function(module) { module.exports = "<template><require from=\"../resources/currency-format\"></require><require from=\"./cart-item\"></require><div class=\"uk-section uk-padding-large uk-section-default\"><div class=\"uk-container\"><div uk-grid><div class=\"uk-width-2-3\"><div class=\"uk-card uk-card-body uk-card-default\"><div class=\"uk-margin-medium\"><cart-item id.bind=\"id\" name.bind=\"data.name\" quantity.bind=\"data.quantity\" price.bind=\"data.price\" repeat.for=\"[id, data] of items\"></cart-item><div if.bind=\"items.size < 1\">Your cart is empty.</div></div></div></div><div class=\"uk-width-1-3\"><div class=\"uk-card uk-card-body uk-card-primary\"><h3>Your Order</h3><div id=\"totals\" class=\"uk-margin-medium-bottom\"><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Subtotal</div><div>${subtotal | currencyFormat}</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Taxes (13%)</div><div>${taxes | currencyFormat}</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Shipping</div><div>¯\\_(ツ)_/¯</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Total</div><div>${total | currencyFormat}</div></div></div><a route-href=\"route: checkout\" class=\"uk-button uk-width-1-1 uk-button-primary\">Checkout</a></div></div></div></div></div></template>"; });
define('text!cart/checkout.html', ['module'], function(module) { module.exports = "<template><require from=\"../resources/currency-format\"></require><require from=\"aurelia-mask\"></require><div class=\"uk-section uk-padding-large uk-section-default\"><div class=\"uk-container\"><div uk-grid><div class=\"uk-width-2-3\"><div class=\"uk-card uk-card-body uk-card-default\"><h2 class=\"uk-heading-line uk-text-center\"><span>Shipping Information</span></h2><div class=\"uk-margin-medium\"><form submit.delegate=\"submit()\" uk-grid><div class=\"uk-width-1-2\" validation-errors.bind=\"firstNameErrors\"><label class=\"uk-form-label\" for=\"first-name\">First Name</label><div class=\"uk-form-controls\"><input class.bind=\"firstNameErrors.length ? 'uk-input uk-form-danger' : 'uk-input'\" id=\"first-name\" type=\"text\" value.bind=\"firstName & validate\"></div></div><div class=\"uk-width-1-2\" validation-errors.bind=\"lastNameErrors\"><label class=\"uk-form-label\" for=\"last-name\">Last Name</label><div class=\"uk-form-controls\"><input class.bind=\"lastNameErrors.length ? 'uk-input uk-form-danger' : 'uk-input'\" id=\"last-name\" type=\"text\" value.bind=\"lastName & validate\"></div></div><div class=\"uk-width-2-3\" validation-errors.bind=\"emailErrors\"><label class=\"uk-form-label\" for=\"emailAddress\">Email Address</label><div class=\"uk-form-controls\"><input class.bind=\"emailErrors.length ? 'uk-input uk-form-danger' : 'uk-input'\" id=\"emailAddress\" type=\"text\" value.bind=\"emailAddress & validate\"></div></div><div class=\"uk-width-1-3\" validation-errors.bind=\"phoneErrors\"><label class=\"uk-form-label\" for=\"phone\">Phone</label><div class=\"uk-form-controls\"><input class.bind=\"phoneErrors.length ? 'uk-input uk-form-danger' : 'uk-input'\" id=\"phone\" type=\"text\" masked=\"value.bind: phone & validate; mask: (999) 999-9999;\"></div></div><div class=\"uk-width-3-4\" validation-errors.bind=\"streetErrors\"><label class=\"uk-form-label\" for=\"email\">Street and Number</label><div class=\"uk-form-controls\"><input class.bind=\"streetErrors.length ? 'uk-input uk-form-danger' : 'uk-input'\" id=\"street\" type=\"text\" value.bind=\"street & validate\"></div></div><div class=\"uk-width-1-4\" validation-errors.bind=\"apartmentNumErrors\"><label class=\"uk-form-label\" for=\"email\">Apartment</label><div class=\"uk-form-controls\"><input class.bind=\"apartmentErrors.length ? 'uk-input uk-form-danger' : 'uk-input'\" id=\"apartment\" type=\"text\" value.bind=\"apartment\"></div></div><div class=\"uk-width-1-2\"><label class=\"uk-form-label\" for=\"country\">Country</label><div class=\"uk-form-controls\"><select class=\"uk-select\" id=\"country\" value.bind=\"country\"><option repeat.for=\"country of countries\" value.bind=\"country\">${country}</option></select></div></div><div class=\"uk-width-1-2\"><label class=\"uk-form-label\" for=\"province\">Province</label><div class=\"uk-form-controls\"><select class=\"uk-select\" id=\"province\" value.bind=\"province\"><option repeat.for=\"province of provinces\" value.bind=\"province\">${province}</option></select></div></div><div class=\"uk-width-1-2\" validation-errors.bind=\"cityErrors\"><label class=\"uk-form-label\" for=\"city\">City</label><div class=\"uk-form-controls\"><input class.bind=\"cityErrors.length ? 'uk-input uk-form-danger' : 'uk-input'\" id=\"city\" type=\"text\" value.bind=\"city & validate\"></div></div><div class=\"uk-width-1-2\" validation-errors.bind=\"postalCodeErrors\"><label class=\"uk-form-label\" for=\"postalCode\">Postal Code</label><div class=\"uk-form-controls\"><input class.bind=\"postalCodeErrors.length ? 'uk-input uk-form-danger' : 'uk-input'\" id=\"postalCode\" type=\"text\" masked=\"value.bind: postalCode & validate; mask: A9A 9A9;\"></div></div><div class=\"uk-width-1-1\"><div repeat.for=\"error of validator.errors\" class=\"uk-alert-danger\" uk-alert><p>${error.message}</p></div></div><div class=\"uk-width-1-1\"><button type=\"submit\" class=\"uk-button uk-button-primary uk-width-1-1 uk-margin-medium-top\">Pay & Checkout</button><p class=\"uk-text-small uk-text-center\">In demo land, everything is free! No need to enter your credit card details.</p><div></div></div></form></div></div></div><div class=\"uk-width-1-3\"><div class=\"uk-card uk-card-body uk-card-primary\"><h3>Your Order</h3><div id=\"totals\" class=\"uk-margin-medium-bottom\"><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Subtotal</div><div>${cart.subtotal | currencyFormat}</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Taxes (13%)</div><div>${cart.taxes | currencyFormat}</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Shipping</div><div>¯\\_(ツ)_/¯</div></div><div class=\"uk-grid-small uk-margin-remove-top\" uk-grid><div class=\"uk-width-expand\" uk-leader>Total</div><div>${cart.total | currencyFormat}</div></div></div></div></div></div></div></div></template>"; });
define('text!cart/confirm.html', ['module'], function(module) { module.exports = "<template><require from=\"../resources/currency-format\"></require><div class=\"uk-section uk-padding-large uk-section-default\"><div class=\"uk-container\"><div class=\"uk-alert-success uk-margin-small-bottom\" uk-alert><p>Your order has been confirmed! Your order ID is <strong>${id}</strong>.</p></div><div class=\"uk-alert-primary uk-margin-medium-bottom\" uk-alert>A confirmation email has been sent to <strong>${shippingInfo.emailAddress}</strong>. Expected shipping date is <strong>a state of mind</strong>.</div><div uk-grid><div class=\"uk-width-1-3\" style=\"font-size:.8em\"><div class=\"uk-card uk-card-body uk-card-default\"><h3>Shipping Details</h3><table class=\"uk-table uk-table-small\"><tbody><tr><td>First Name</td><td>${shippingInfo.firstName}</td></tr><tr><td>Last Name</td><td>${shippingInfo.lastName}</td></tr><tr><td>Street</td><td>${shippingInfo.street}</td></tr><tr><td>Apartment</td><td>${shippingInfo.apartmentNum}</td></tr><tr><td>City</td><td>${shippingInfo.city}</td></tr><tr><td>Province</td><td>${shippingInfo.province}</td></tr><tr><td>Postal Code</td><td>${shippingInfo.postalCode}</td></tr></tbody></table></div></div><div class=\"uk-width-2-3\"><div class=\"uk-card uk-card-body uk-card-default\"><h3>Order Details</h3><table class=\"uk-table uk-table-striped\"><thead><tr><th>Item</th><th>Quantity</th><th>Price (each)</th><th>Subtotal</th></tr></thead><tfoot><tr><th></th><th></th><th>Subtotal</th><th style=\"color:#000;font-size:1.1em\">${totals.subtotal | currencyFormat }</th></tr><tr><th></th><th></th><th>Taxes (13%)</th><th style=\"color:#000;font-size:1.1em\">${totals.taxes | currencyFormat }</th></tr><tr><th></th><th></th><th>Total</th><th style=\"font-weight:700;color:#000;font-size:1.1em\">${totals.total | currencyFormat }</th></tr></tfoot><tbody><tr repeat.for=\"item of items\"><td>${item.name}</td><td>${item.quantity}</td><td>${item.price | currencyFormat }</td><td>${item.subtotal | currencyFormat }</td></tr></tbody></table></div></div></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map
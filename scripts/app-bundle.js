define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    this.message = 'Products';
  };
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
define('product-list',["exports", "./web-api"], function (exports, _webApi) {
  "use strict";

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

    ProductList.prototype.addToCart = function addToCart() {
      alert("in addToCart");
    };

    return ProductList;
  }(), _class.inject = [_webApi.WebAPI], _temp);
});
define('web-api',['exports'], function (exports) {
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
  var id = 0;

  function getId() {
    return ++id;
  }

  var products = [{
    id: getId(),
    name: 'Radical Coffee Maker',
    description: 'The best coffee maker your ass will ever own',
    imgUrl: ''
  }, {
    id: getId(),
    name: 'The Worst Shit Ever',
    description: 'The worst coffee maker your ass will ever own',
    imgUrl: ''
  }, {
    id: getId(),
    name: 'Some Gnarly Product',
    description: 'You dont want to use this thing or buy it or nothing',
    imgUrl: ''
  }, {
    id: getId(),
    name: 'Radical Coffee Maker',
    description: 'The best coffee maker your ass will ever own',
    imgUrl: ''
  }, {
    id: getId(),
    name: 'Tub of Butter',
    description: 'I don\'t think you\'re ready for this jelly',
    imgUrl: ''
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
              imgUrl: x.imgUrl
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
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('product-card',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
  "use strict";

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

  var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

  var ProductCard = exports.ProductCard = (_class = function () {
    function ProductCard() {
      _classCallCheck(this, ProductCard);

      _initDefineProp(this, "id", _descriptor, this);

      _initDefineProp(this, "name", _descriptor2, this);

      _initDefineProp(this, "description", _descriptor3, this);

      this.quantity = 1;
    }

    ProductCard.prototype.addToCart = function addToCart() {
      alert("in addToCart for: " + this.id);
    };

    ProductCard.prototype.increaseQuantity = function increaseQuantity() {
      this.quantity = this.quantity + 1;
    };

    ProductCard.prototype.decreaseQuantity = function decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity = this.quantity - 1;
      }
    };

    return ProductCard;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "id", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "name", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "description", [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return "";
    }
  })), _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./product-list\"></require><nav class=\"uk-navbar-container\" uk-navbar><div class=\"uk-navbar-center\"><div class=\"uk-navbar-left\"><ul class=\"uk-navbar-nav\"><li><a href=\"#\">Products</a></li><li><a href=\"#\">Deals</a></li></ul></div><a href=\"\" class=\"uk-navbar-item uk-logo\">ReCommerce</a><div class=\"uk-navbar-right\"><ul class=\"uk-navbar-nav\"><li><a href=\"#\">Cart</a></li><li><a href=\"#\">Account</a></li></ul></div></div></nav><div class=\"uk-section uk-padding-large uk-section-default\"><div class=\"uk-container\"><h1 class=\"uk-heading-line\"><span>${message}</span></h1><product-list></product-list></div></div></template>"; });
define('text!product-list.html', ['module'], function(module) { module.exports = "<template><require from=\"./product-card\"></require><div class=\"product-list uk-grid-large\" uk-grid uk-height-match=\"target: > div > .uk-card\"><div repeat.for=\"product of products\" class=\"uk-width-1-3@m uk-width-1-4@l\"><product-card id=\"${product.id}\" name=\"${product.name}\" description=\"${product.description}\"></product-card></div></div></template>"; });
define('text!product-card.html', ['module'], function(module) { module.exports = "<template><div class=\"uk-card uk-card-body uk-card-default\"><div class=\"uk-card-media-top\"><img width=\"600\" height=\"400\" src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNjAwcHgiIGhlaWdodD0iNDAwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2MDAgNDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IGZpbGw9IiNGNUY1RjUiIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIi8+DQo8ZyBvcGFjaXR5PSIwLjciPg0KCTxwYXRoIGZpbGw9IiNEOEQ4RDgiIGQ9Ik0yMjguMTg0LDE0My41djExM2gxNDMuNjMydi0xMTNIMjI4LjE4NHogTTM2MC4yNDQsMjQ0LjI0N0gyNDAuNDM3di04OC40OTRoMTE5LjgwOEwzNjAuMjQ0LDI0NC4yNDcNCgkJTDM2MC4yNDQsMjQ0LjI0N3oiLz4NCgk8cG9seWdvbiBmaWxsPSIjRDhEOEQ4IiBwb2ludHM9IjI0Ni44ODEsMjM0LjcxNyAyNzEuNTcyLDIwOC43NjQgMjgwLjgyNCwyMTIuNzY4IDMxMC4wMTYsMTgxLjY4OCAzMjEuNTA1LDE5NS40MzQgDQoJCTMyNi42ODksMTkyLjMwMyAzNTQuNzQ2LDIzNC43MTcgCSIvPg0KCTxjaXJjbGUgZmlsbD0iI0Q4RDhEOCIgY3g9IjI3NS40MDUiIGN5PSIxNzguMjU3IiByPSIxMC43ODciLz4NCjwvZz4NCjwvc3ZnPg0K\" alt=\"\"></div><h3 class=\"uk-card-title\">${name}</h3>${description}</div><button click.delegate=\"addToCart()\" class=\"uk-button uk-button-primary uk-width-1-1\">Add to Cart</button><div class=\"uk-child-width-1-3 uk-grid-collapse uk-margin-top\" uk-grid><div class=\"uk-text-left uk-margin-remove\"><button click.delegate=\"decreaseQuantity()\" class=\"uk-button uk-button-small uk-button-default\">-</button></div><div class=\"uk-text-left uk-text-small uk-margin-remove\">Quantity: <span class=\"uk-text-bold\">${quantity}</span></div><div class=\"uk-text-right uk-margin-remove\"><button click.delegate=\"increaseQuantity()\" class=\"uk-button uk-button-small uk-button-default\">+</button></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map
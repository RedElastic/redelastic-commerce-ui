export class ShoppingCartQuantityUpdated {
  constructor(quantity) {
    this.quantity = quantity;
  }
}

export class CartItemQuantityUpdated {
  constructor(id, quantity) {
    this.id = id;
    this.quantity = quantity;
  }
}

export class ProductAddedToCart {
  constructor(id, data) {
    this.id = id;
    this.data = data;
  }
}

export class ProductAlreadyInCart {
  constructor(id, data) {
    this.id = id;
    this.data = data;
  }
}

export class ProductRemovedFromCart {
  constructor(id) {
    this.id = id;
  }
}
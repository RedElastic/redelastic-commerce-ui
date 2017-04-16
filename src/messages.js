export class ShoppingCartQuantityUpdated {
  constructor(quantity) {
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
  constructor(id) {
    this.id = id;
  }
}

export class ProductRemovedFromCart {
  constructor(id) {
    this.id = id;
  }
}
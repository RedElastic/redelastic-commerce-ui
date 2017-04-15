export class ShoppingCartQuantityUpdated {
  constructor(quantity) {
    this.quantity = quantity;
  }
}

export class ProductAddedToCart {
  constructor(id, quantity) {
    this.id = id;
    this.quantity = quantity;
  }
}

export class ProductAlreadyInCart {
  constructor(id) {
    this.id = id;
  }
}
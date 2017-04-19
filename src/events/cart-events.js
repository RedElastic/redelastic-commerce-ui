export class ProductQuantityChanged {
  constructor(id, quantity) {
    this.id = id;
    this.quantity = quantity;
  }
}

export class ProductRemovedFromCart {
  constructor(id) {
    this.id = id;
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

export class CartUniqueItemsCountChanged {
  constructor(count) {
    this.count = count;
  }
}
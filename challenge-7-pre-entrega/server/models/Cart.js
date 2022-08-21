class Cart {
  constructor(id, timestamp, products) {
    this.id = id;
    this.timestamp = Date.now();
    this.products = products;
  }
}

module.exports = Cart;

class Cart {
  constructor(id, timestamp, products) {
    this.id = id;
    this.timestamp = new Date();
    this.products = products;
  }
}

module.exports = Cart;

class Product {
  constructor(id, code, title, price, description, urlImg, stock, timestamp) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.price = price;
    this.description = description;
    this.urlImg = urlImg;
    this.stock = stock;
    this.timestamp = new Date();
  }
}

module.exports = Product;

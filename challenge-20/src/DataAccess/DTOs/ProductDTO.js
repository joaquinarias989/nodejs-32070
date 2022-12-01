class ProductDTO {
  constructor(prod) {
    this.code = prod.code;
    this.title = prod.title;
    this.price = prod.price;
    this.description = prod.description;
    this.urlImg = prod.urlImg;
    this.color = prod.color;
    this.stock = prod.stock;
    this.sizes = prod.sizes;
  }
}

module.exports = ProductDTO;

const MongoDBContainer = require('../Containers/MongoDBContainer');
const prodSchema = require('../Schemas/Product');

class ProductDAO extends MongoDBContainer {
  constructor() {
    super('Product', prodSchema);
  }

  async SaveProduct(obj) {
    try {
      let prodQuantities = [];
      for (let i = 0; i < obj.sizes.length; i++) {
        prodQuantities[i] = 0;
      }
      const prod = new this.model({
        code: obj.code,
        title: obj.title,
        price: obj.price,
        description: obj.description,
        urlImg: obj.urlImg,
        color: obj.color,
        stock: obj.stock,
        sizes: obj.sizes,
        quantities: prodQuantities, // this property is used only for Cart
        timestamp: new Date(),
      });

      const prodExist = await this.GetProductByCode(obj.code);
      if (prodExist) return null;

      const savedProd = await prod.save();
      return savedProd;
    } catch (error) {
      throw new Error(error);
    }
  }

  async UpdateProduct(obj) {
    try {
      let prodQuantities = [];
      for (let i = 0; i < obj.sizes.length; i++) {
        prodQuantities[i] = 0;
      }
      const updatedInfo = {
        title: obj.title,
        price: obj.price,
        description: obj.description,
        urlImg: obj.urlImg,
        color: obj.color,
        stock: obj.stock,
        sizes: obj.sizes, // this property is used only for Cart
        quantities: prodQuantities,
        timestamp: new Date(),
      };
      const updatedProd = await this.model.findByIdAndUpdate(
        obj.id,
        updatedInfo,
        { new: true }
      );

      return updatedProd ? true : false;
    } catch (error) {
      throw new Error(error.name);
    }
  }

  async GetProductByCode(code) {
    try {
      const doc = await this.model.findOne({ code });
      if (!doc) return null;
      return doc;
    } catch (error) {
      throw new Error(error.name);
    }
  }

  async VerifyStockOfPurchase(products) {
    let error = '';
  }
}

module.exports = ProductDAO;

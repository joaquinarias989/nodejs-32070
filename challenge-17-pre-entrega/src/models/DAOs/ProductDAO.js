const MongoDBContainer = require('../Containers/MongoDBContainer');
const prodSchema = require('../Schemas/Product');

class ProductDAO extends MongoDBContainer {
  constructor() {
    super('Product', prodSchema);
  }

  async save(obj) {
    try {
      const prod = new this.model({
        code: obj.code,
        title: obj.title,
        price: obj.price,
        description: obj.description,
        urlImg: obj.urlImg,
        color: obj.color,
        stock: obj.stock,
        size: obj.size,
        timestamp: new Date(),
      });

      const prodExist = await this.getByCode(obj.code);
      if (prodExist) return null;

      const savedProd = await prod.save();
      return savedProd;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(obj) {
    try {
      const updatedInfo = {
        title: obj.title,
        price: obj.price,
        description: obj.description,
        urlImg: obj.urlImg,
        color: obj.color,
        stock: obj.stock,
        size: obj.size,
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

  async getByCode(code) {
    try {
      const doc = await this.model.findOne({ code });
      if (!doc) return null;
      return doc;
    } catch (error) {
      throw new Error(error.name);
    }
  }
}

module.exports = ProductDAO;

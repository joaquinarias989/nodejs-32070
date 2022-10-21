const MongoDBContainer = require("../../containers/MongoDBContainer");
const prodSchema = require("../Schemas/Product");

class ProductDAOMongoDB extends MongoDBContainer {
  constructor() {
    super("Product", prodSchema);
  }

  async save(obj) {
    try {
      const prod = new this.model({
        code: obj.code,
        title: obj.title,
        price: obj.price,
        description: obj.description,
        urlImg: obj.urlImg,
        stock: obj.stock,
        timestamp: new Date(),
      });
      const savedProd = await prod.save();

      return savedProd;
    } catch (error) {
      throw new Error(error.name);
    }
  }
  async update(obj) {
    try {
      const updatedInfo = {
        title: obj.title,
        price: obj.price,
        description: obj.description,
        urlImg: obj.urlImg,
        stock: obj.stock,
        timestamp: new Date(),
      };
      const updatedProd = await this.model.findByIdAndUpdate(
        obj.id,
        updatedInfo,
        { new: true }
      );
      console.log(updatedProd);

      return updatedProd ? true : false;
    } catch (error) {
      throw new Error(error.name);
    }
  }
}

module.exports = ProductDAOMongoDB;

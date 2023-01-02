const MongoDBContainer = require('../Containers/MongoDBContainer');
const prodSchema = require('../Schemas/Product');

class ProductDAO extends MongoDBContainer {
  constructor() {
    super('Product', prodSchema);
  }

  async SaveProduct(prod) {
    try {
      const prodExist = await this.GetProductByCode(prod.code);
      if (prodExist) return null;

      const prodToSave = this.model({ ...prod, timestamp: new Date() });
      const savedProd = await prodToSave.save();
      return savedProd;
    } catch (error) {
      throw new Error(error);
    }
  }

  async UpdateProduct(idProd, updatedData) {
    try {
      const updatedProd = await this.model.findByIdAndUpdate(
        idProd,
        updatedData,
        {
          new: true,
        }
      );

      return updatedProd ? true : false;
    } catch (error) {
      throw new Error(error);
    }
  }

  async GetProductByCode(code) {
    try {
      const doc = await this.model.findOne({ code });
      if (!doc) return null;
      return doc;
    } catch (error) {
      throw new Error(error);
    }
  }

  async GetProductsByCategory(category) {
    try {
      let docs = await this.model.find({ category });
      if (!docs || !docs.length) return null;
      return docs;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ProductDAO;

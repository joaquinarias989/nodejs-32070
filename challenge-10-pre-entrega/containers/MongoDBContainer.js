require("../db/MongoDB/config");
const mongoose = require("mongoose");

class MongoDBContainer {
  constructor(collectionName, schema) {
    this.model = mongoose.model(collectionName, schema);
  }

  async getById(id) {
    try {
      const doc = await this.model.findById(id);
      console.log(doc);
      if (!doc) return null;
      return doc;
    } catch (error) {
      throw new Error(error.name);
    }
  }
  async deleteById(id) {
    try {
      const doc = await this.model.findByIdAndRemove(id);
      if (!doc) return false;
      return true;
    } catch (error) {
      throw new Error(error.name);
    }
  }
}

module.exports = MongoDBContainer;

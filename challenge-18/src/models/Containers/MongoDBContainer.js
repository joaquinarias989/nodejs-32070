require("../../db/config");
const mongoose = require("mongoose");

class MongoDBContainer {
  constructor(collectionName, schema) {
    this.model = mongoose.model(collectionName, schema);
  }

  async getAll() {
    try {
      const docs = await this.model.find({});
      return docs.length ? docs : null;
    } catch (error) {
      throw new Error(error.name);
    }
  }
  async getById(id) {
    try {
      const doc = await this.model.findById(id);
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

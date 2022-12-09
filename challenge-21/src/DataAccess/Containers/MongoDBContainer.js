require('../dbConfig');
const mongoose = require('mongoose');

class MongoDBContainer {
  constructor(collectionName, schema) {
    this.model = mongoose.model(collectionName, schema);
  }

  async GetAll() {
    try {
      const docs = await this.model.find({});
      return docs.length ? docs : null;
    } catch (error) {
      throw new Error(error);
    }
  }
  async GetById(id) {
    try {
      const doc = await this.model.findById(id);
      if (!doc) return null;
      return doc;
    } catch (error) {
      throw new Error(error);
    }
  }
  async DeleteById(id) {
    try {
      const doc = await this.model.findByIdAndRemove(id);
      if (!doc) return false;
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = MongoDBContainer;

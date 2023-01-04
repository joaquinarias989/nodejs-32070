const MongoDBContainer = require('../Containers/MongoDBContainer');
const messageSchema = require('../Schemas/Message');

class MessageDAO extends MongoDBContainer {
  constructor() {
    super('Message', messageSchema);
  }

  async SaveMsg(msg) {
    try {
      const newMessage = new this.model({
        ...msg,
      });
      const savedMsg = await newMessage.save();

      return savedMsg ? savedMsg : null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = MessageDAO;

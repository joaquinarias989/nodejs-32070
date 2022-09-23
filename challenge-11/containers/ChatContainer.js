const ChatMessage = require("../models/ChatMessage");
const { options } = require("../db/SQLite3/connection");
const knex = require("knex").knex(options);

class Container {
  constructor(table) {
    this.table = table;
  }

  async saveMsg(obj) {
    try {
      let msgToSave = new ChatMessage(undefined, obj.author, obj.text);
      console.log(msgToSave);
      await knex(this.table).insert(msgToSave);
      return msgToSave;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getAll() {
    try {
      const messages = await knex.from(this.table).select("*");
      if (!messages.length) {
        console.log("No hay mensajes por el momento");
        return null;
      }
      return messages;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = Container;

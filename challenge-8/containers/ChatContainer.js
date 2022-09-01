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
      await knex(this.table).insert(msgToSave);
      console.log(msgToSave);
      return msgToSave;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await knex.destroy();
    }
  }
  async getAll() {
    try {
      const messages = await knex.from(this.table).select("*");
      if (!messages.length) {
        console.log("No hay mensajes por el momento");
        return null;
      }
      console.log(messages);
      return messages;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await knex.destroy();
    }
  }
}

module.exports = Container;

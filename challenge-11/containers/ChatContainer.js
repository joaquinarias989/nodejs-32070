const fs = require("fs").promises;
const ChatMessage = require("../models/ChatMessage");

class Container {
  constructor(path) {
    this.path = path;
  }

  async saveMsg(obj) {
    try {
      let msg = new ChatMessage(obj.author, obj.message);

      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      if (json.length) {
        obj.id = json[json.length - 1].id + 1;
        await fs.writeFile(
          this.path,
          JSON.stringify([...json, { id: obj.id, ...msg }], null, 2)
        );
      } else {
        obj.id = 1;
        await fs.writeFile(
          this.path,
          JSON.stringify([{ id: obj.id, ...msg }], null, 2)
        );
      }
      return msg;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getAll() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      if (!json.length) {
        console.log("No hay mensajes por el momento");
        return null;
      }
      return json;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = Container;

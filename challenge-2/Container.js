const fs = require("fs");

//Implement a pogram that contains a class named "Container" that is named after the file you are working with and implements some methods

class Container {
  constructor(path) {
    this.path = path;
  }

  async save(obj) {
    try {
      const data = await fs.readFileSync(this.path, "utf8");
      const json = JSON.parse(data);
      if (json.length)
        await fs.writeFileSync(
          this.path,
          JSON.stringify([...json, { id: json.length + 1, ...obj }], null, 2)
        );
      else
        await fs.writeFileSync(
          this.path,
          JSON.stringify([{ id: json.length + 1, ...obj }], null, 2)
        );

      return json.length + 1;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const data = await fs.readFileSync(this.path, "utf8");
      const json = JSON.parse(data);
      return json.find((item) => item.id === id);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.readFileSync(this.path, "utf8");
      const json = JSON.parse(data);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await fs.readFileSync(this.path, "utf8");
      const json = JSON.parse(data);
      const newJson = json.filter((item) => item.id !== id);
      await fs.writeFileSync(this.path, JSON.stringify(newJson, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Container;

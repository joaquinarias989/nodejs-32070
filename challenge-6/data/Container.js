const fs = require("fs").promises;

class Container {
  constructor(path) {
    this.path = path;
  }

  async save(obj) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      if (json.length) {
        obj.id = json[json.length - 1].id + 1;
        await fs.writeFile(this.path, JSON.stringify([...json, obj], null, 2));
      } else {
        obj.id = 1;
        await fs.writeFile(this.path, JSON.stringify([obj], null, 2));
      }
      console.log(obj);
      return obj.id;
    } catch (error) {
      console.log(error);
    }
  }

  async update(obj) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const prod = await this.getById(obj.id);
      if (prod) {
        const newJson = json.map((item) => {
          if (item.id === obj.id) {
            item.title = obj.title;
            item.price = obj.price;
            item.stock = obj.stock;
          }
          return item;
        });
        await fs.writeFile(this.path, JSON.stringify(newJson, null, 2));
        return prod;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const prod = json.find((item) => item.id === id);
      if (!prod) return console.log("No existe el producto buscado");
      return prod;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      if (!json.length)
        return console.log("No tenemos stock de productos por el momento");
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const prod = await this.getById(id);
      if (!prod) return false;
      const newJson = json.filter((item) => item.id !== id);
      await fs.writeFile(this.path, JSON.stringify(newJson, null, 2));
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      if (!json.length) return console.log("No hay productos a eliminar");
      return await fs.writeFile(this.path, JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Container;

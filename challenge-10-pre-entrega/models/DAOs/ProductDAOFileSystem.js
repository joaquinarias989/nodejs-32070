const FileSystemContainer = require("../../containers/FileSystemContainer");
const fs = require("fs").promises;
const Product = require("../../models/Product");

class ProductDAOFileSystem extends FileSystemContainer {
  constructor() {
    super("db/FileSystem/products.json");
  }

  async save(obj) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const prod = new Product(
        undefined,
        obj.code,
        obj.title,
        obj.price,
        obj.description,
        obj.urlImg,
        obj.stock
      );
      if (json.length) {
        prod.id = Number(Number(json[json.length - 1].id) + 1).toString();
        await fs.writeFile(this.path, JSON.stringify([...json, prod], null, 2));
      } else {
        prod.id = "1";
        await fs.writeFile(this.path, JSON.stringify([prod], null, 2));
      }
      return prod;
    } catch (error) {
      console.log(error);
    }
  }
  async update(obj) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const prod = json.find((item) => item.id === obj.id);
      if (!prod) return false;
      prod.title = obj.title;
      prod.price = obj.price;
      prod.description = obj.description;
      prod.urlImg = obj.urlImg;
      prod.stock = obj.stock;
      prod.timestamp = new Date();
      await fs.writeFile(this.path, JSON.stringify(json, null, 2));
      return true;
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

module.exports = ProductDAOFileSystem;

const fs = require("fs").promises;
const Cart = require("../models/Cart");

class Container {
  constructor(path) {
    this.path = path;
  }

  async create() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const cart = new Cart();
      if (json.length) {
        cart.id = json[json.length - 1].id + 1;
        cart.products = [];
        await fs.writeFile(this.path, JSON.stringify([...json, cart], null, 2));
      } else {
        cart.id = 1;
        cart.products = [];
        await fs.writeFile(this.path, JSON.stringify([cart], null, 2));
      }
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async addProductToCart(idCart, prod) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const cart = json.find((cart) => cart.id === idCart);
      if (cart) {
        cart.products.push(prod);
        await fs.writeFile(this.path, JSON.stringify(json, null, 2));
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const cart = json.find((cart) => cart.id === id);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const prod = await this.getById(id);
      if (!prod) return false;
      const newJson = json.filter((cart) => cart.id !== id);
      await fs.writeFile(this.path, JSON.stringify(newJson, null, 2));
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductFromCart(idCart, idProd) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const json = JSON.parse(data);
      const cart = json.find((cart) => cart.id === idCart);
      if (!cart) return false;
      const prod = cart.products.find((p) => p.id === idProd);
      if (!prod) return false;
      const newProds = cart.products.filter((prod) => prod.id !== idProd);
      cart.products = newProds;
      await fs.writeFile(this.path, JSON.stringify(json, null, 2));
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Container;

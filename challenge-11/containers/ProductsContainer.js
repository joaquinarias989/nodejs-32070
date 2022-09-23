const { options } = require("../db/mariaDB/connection");
const knex = require("knex").knex(options);
const Product = require("../models/Product");

class Container {
  constructor(table) {
    this.table = table;
  }

  async save(obj) {
    try {
      let prodToSave = new Product(
        undefined,
        obj.code,
        obj.title,
        obj.price,
        obj.description,
        obj.urlImg,
        obj.stock
      );
      await knex(this.table).insert(prodToSave);
      return prodToSave;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async update(obj) {
    try {
      await knex.from(this.table).where("id", "=", obj.id).first().update({
        title: obj.title,
        price: obj.price,
        description: obj.description,
        urlImg: obj.urlImg,
        stock: obj.stock,
        timestamp: new Date(),
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getById(id) {
    try {
      const prod = await knex.from(this.table).where("id", "=", id).first();
      if (!prod) {
        console.log("No existe el producto buscado");
        return null;
      }
      return prod;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getAll() {
    try {
      const prods = await knex.from(this.table).select("*");
      if (!prods.length) {
        console.log("No tenemos stock de productos por el momento");
        return null;
      }
      return prods;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async deleteById(id) {
    try {
      await knex.from(this.table).where("id", "=", id).first().del();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async deleteAll() {
    try {
      await knex.from(this.table).del();
      return true;
    } catch (error) {
      console.log(error);
      console.log("No hay productos a eliminar");
      return false;
    }
  }
}

module.exports = Container;

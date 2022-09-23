const { faker } = require("@faker-js/faker/locale/es");

class Container {
  constructor(path) {
    this.path = path;
  }

  async generateFakeProd() {
    const fake = {
      code: faker.lorem.words(1),
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      urlImg: faker.internet.url(),
      stock: faker.random.numeric(1),
      timestamp: faker.date.recent(),
    };
    return fake;
  }

  async getAll() {
    try {
      const fiveProds = [];
      for (let i = 0; i < 5; i++) {
        const newProd = await this.generateFakeProd();
        fiveProds.push(newProd);
      }
      return fiveProds;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Container;

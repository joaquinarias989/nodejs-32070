const MongoDBContainer = require("../Containers/MongoDBContainer");
const cartSchema = require("../Schemas/Cart");

class CartDAO extends MongoDBContainer {
  constructor() {
    super("Cart", cartSchema);
  }

  async createCart() {
    try {
      const newCart = new this.model({
        products: [],
        timestamp: new Date(),
      });
      const savedCart = await newCart.save();

      return savedCart ? savedCart : null;
    } catch (error) {
      throw new Error(error.name);
    }
  }
  async addProductToCart(idCart, prod) {
    try {
      const cart = await this.getById(idCart);
      if (!cart) {
        return null;
      }

      const updatedInfo = {
        products: [
          ...cart.products,
          {
            id: prod.id,
            code: prod.code,
            title: prod.title,
            price: prod.price,
            description: prod.description,
            urlImg: prod.urlImg,
            stock: prod.stock,
            timestamp: prod.timestamp,
          },
        ],
        timestamp: new Date(),
      };
      const updatedCart = await this.model.findByIdAndUpdate(
        idCart,
        updatedInfo,
        { new: true }
      );
      return updatedCart ? true : false;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteProductFromCart(idCart, idProd) {
    try {
      const cart = await this.model.findById(idCart);
      if (!cart) return false;
      const isProdInCart = cart.products.some((p) => p.id === idProd);
      if (!isProdInCart) return false;
      const updatedProds = cart.products.filter((prod) => prod.id !== idProd);
      const updatedInfo = {
        products: updatedProds,
        timestamp: new Date(),
      };
      const updatedCart = await this.model.findByIdAndUpdate(
        idCart,
        updatedInfo,
        { new: true }
      );
      return updatedCart ? true : false;
    } catch (error) {
      throw new Error(error.name);
    }
  }
}

module.exports = CartDAO;

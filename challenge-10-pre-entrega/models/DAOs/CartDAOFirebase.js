const FirebaseContainer = require("../../containers/FirebaseContainer");

class CartDAOFirebase extends FirebaseContainer {
  constructor() {
    super("cart");
  }

  async createCart(obj) {
    try {
      const cart = {
        products: [],
        timestamp: new Date(),
      };
      await this.collectionName.add(cart);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(idCart, prod) {
    try {
      const cartRef = await this.collectionName.doc(idCart);
      const cart = await cartRef.get();
      if (!cart.exists) return false;
      await cartRef.update({
        products: [...cart.data().products, prod],
        timestamp: new Date(),
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductFromCart(idCart, idProd) {
    try {
      const cartRef = await this.collectionName.doc(idCart);
      const cart = await cartRef.get();
      if (!cart.exists) return false;
      const prod = cart.data().products.find((p) => p.id === idProd);
      if (!prod) return false;
      const newProds = cart
        .data()
        .products.filter((prod) => prod.id !== idProd);
      await cartRef.update({
        products: newProds,
        timestamp: new Date(),
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CartDAOFirebase;

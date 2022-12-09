const MongoDBContainer = require('../Containers/MongoDBContainer');
const cartSchema = require('../Schemas/Cart');

class CartDAO extends MongoDBContainer {
  constructor() {
    super('Cart', cartSchema);
  }

  async CreateCart(userEmail) {
    try {
      const newCart = new this.model({
        products: [],
        userEmail,
        timestamp: new Date(),
      });
      const savedCart = await newCart.save();

      return savedCart ? savedCart : null;
    } catch (error) {
      throw new Error(error.name);
    }
  }

  async AddProductToCart(idCart, prod, size, quantity) {
    try {
      const cart = await this.getById(idCart);
      if (!cart) {
        return 'No existe el Carrito seleccionado';
      }

      // Verify Size
      const sizeExist = prod.sizes.find((s) => s === size.toUpperCase().trim());
      if (!sizeExist) {
        return `No tenemos stock del producto en Talle ${size
          .toUpperCase()
          .trim()}.`;
      }

      // Verify Stock of Size selected
      const sizeIndex = prod.sizes.indexOf(sizeExist);
      const stockOfSize = prod.stock[sizeIndex];
      if (quantity > stockOfSize) {
        return `No tenemos suficiente stock del producto en Talle ${sizeExist}`;
      }

      let updatedInfo;
      const prodExistInCart = cart.products.find((p) => p.id === prod.id);
      if (!prodExistInCart) {
        const newProdToCart = {
          id: prod.id,
          code: prod.code,
          title: prod.title,
          price: prod.price,
          urlImg: prod.urlImg,
          color: prod.color,
          sizes: [sizeExist],
          stock: [stockOfSize - quantity],
          quantities: [quantity],
        };

        updatedInfo = {
          products: [...cart.products, newProdToCart],
          timestamp: new Date(),
        };
      } else {
        const sizeExistInCart = prodExistInCart.sizes.find(
          (s) => s === sizeExist
        );
        if (sizeExistInCart) {
          const sizeExistInCartIndex =
            prodExistInCart.sizes.indexOf(sizeExistInCart);

          const totalQuantityRequest =
            quantity + prodExistInCart.quantities[sizeExistInCartIndex];
          if (totalQuantityRequest > stockOfSize) {
            return `No tenemos suficiente stock del producto en Talle ${sizeExist}`;
          }

          prodExistInCart.stock[sizeExistInCartIndex] -= quantity;
          prodExistInCart.quantities[sizeExistInCartIndex] += quantity;
        } else {
          prodExistInCart.sizes = [...prodExistInCart.sizes, sizeExist];
          prodExistInCart.stock = [
            ...prodExistInCart.stock,
            stockOfSize - quantity,
          ];
          prodExistInCart.quantities = [
            ...prodExistInCart.quantities,
            quantity,
          ];
        }

        updatedInfo = {
          products: [...cart.products],
          timestamp: new Date(),
        };
      }

      const updatedCart = await this.model.findByIdAndUpdate(
        idCart,
        updatedInfo,
        { new: true }
      );
      return updatedCart
        ? ''
        : 'Ocurrió un error al añadir el producto, por favor, intenta nuevamente';
    } catch (error) {
      throw new Error(error);
    }
  }

  async DeleteProductFromCart(idCart, idProd) {
    try {
      const cart = await this.getById(idCart);
      if (!cart) {
        return 'No existe el Carrito seleccionado';
      }
      const isProdInCart = cart.products.some((p) => p.id === idProd);
      if (!isProdInCart) {
        return 'El Producto seleccionado no se encuentra en el Carrito';
      }
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
      return updatedCart
        ? ''
        : 'Ocurrió un error al eliminar el producto del carrito. Por favor, intenta nuevamente';
    } catch (error) {
      throw new Error(error.name);
    }
  }

  async DeleteProductSizeFromCart(idCart, idProd, size) {
    try {
      const cart = await this.getById(idCart);
      if (!cart) {
        return 'No existe el Carrito seleccionado';
      }

      const prodExistInCart = cart.products.find((p) => p.id === idProd);
      if (!prodExistInCart) {
        return 'El Producto seleccionado no se encuentra en el Carrito';
      }

      const sizeExistInCart = prodExistInCart.sizes.find((s) => s === size);
      if (sizeExistInCart) {
        if (prodExistInCart.sizes.length === 1) {
          const updatedProds = cart.products.filter(
            (prod) => prod.id !== idProd
          );
          const updatedInfo = {
            products: updatedProds,
            timestamp: new Date(),
          };
          const updatedCart = await this.model.findByIdAndUpdate(
            idCart,
            updatedInfo,
            { new: true }
          );
          return updatedCart
            ? ''
            : 'Ocurrió un error al eliminar el Talle del producto del Carrito. Por favor, intenta nuevamente';
        }
        const sizeExistInCartIndex =
          prodExistInCart.sizes.indexOf(sizeExistInCart);

        prodExistInCart.sizes.splice(sizeExistInCartIndex, 1);
        prodExistInCart.stock.splice(sizeExistInCartIndex, 1);
        prodExistInCart.quantities.splice(sizeExistInCartIndex, 1);
      } else {
        return 'El Talle del producto que intentas eliminar, no se encuentra en el Carrito.';
      }

      const updatedInfo = {
        products: [...cart.products],
        timestamp: new Date(),
      };

      const updatedCart = await this.model.findByIdAndUpdate(
        idCart,
        updatedInfo,
        { new: true }
      );
      return updatedCart
        ? ''
        : 'Ocurrió un error al eliminar el producto del carrito. Por favor, intenta nuevamente';
    } catch (error) {
      throw new Error(error.name);
    }
  }

  async ClearCart(idCart) {
    try {
      const cart = await this.getById(idCart);
      if (!cart) {
        return 'No existe el Carrito seleccionado';
      }

      const updatedInfo = {
        products: [],
        timestamp: new Date(),
      };
      const updatedCart = await this.model.findByIdAndUpdate(
        idCart,
        updatedInfo,
        { new: true }
      );
      return updatedCart
        ? ''
        : 'Ocurrió un error al limpiar el Carrito. Por favor, intenta nuevamente';
    } catch (error) {
      throw new Error(error.name);
    }
  }
}

module.exports = CartDAO;

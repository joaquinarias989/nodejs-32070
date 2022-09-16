const CartContainer = require("../models/DAOs/CartDAOFileSystem");
const ProdsContainer = require("../models/DAOs/ProductDAOFileSystem");
// const CartContainer = require("../models/DAOs/CartDAOFirebase");
// const ProdsContainer = require("../models/DAOs/ProductDAOFirebase");
// const CartContainer = require("../models/DAOs/CartDAOMongoDB");
// const ProdsContainer = require("../models/DAOs/ProductDAOMongoDB");
const cart = new CartContainer();
const products = new ProdsContainer();

const CreateCart = async (req, res, next) => {
  try {
    const cartId = await cart.createCart();
    cartId
      ? res
          .status(200)
          .json({ message: "Cart created successfully!", data: cartId })
      : res.status(404).json({ error: "Cart not created. Please, try again" });
  } catch (error) {
    next(error);
  }
};
const AddProductToCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idProduct } = req.body;
    const prodToAdd = await products.getById(idProduct);
    console.log(prodToAdd);
    if (!prodToAdd) return res.status(404).json({ error: "Product not found" });
    const isAdded = await cart.addProductToCart(id, prodToAdd);
    isAdded
      ? res.status(200).json({ message: "Product added successfully!" })
      : res.status(404).json({ error: "Cart or Product not found" });
  } catch (error) {
    next(error);
  }
};
const GetCartProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cartProds = await cart.getById(id);
    cartProds
      ? cartProds.products.length > 0
        ? res.status(200).json(cartProds.products)
        : res.status(404).json({ error: "The cart has no products yet" })
      : res.status(404).json({ error: "Cart not found" });
  } catch (error) {
    next(error);
  }
};
const DeleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDeleted = await cart.deleteById(id);
    isDeleted
      ? res.status(200).json({ message: "Cart deleted successfully!" })
      : res.status(404).json({ error: "Cart not found" });
  } catch (error) {
    next(error);
  }
};
const DeleteProductFromCart = async (req, res, next) => {
  try {
    const { id, idProduct } = req.params;
    const isDeleted = await cart.deleteProductFromCart(id, idProduct);
    isDeleted
      ? res.status(200).json({ message: "Product deleted successfully!" })
      : res.status(404).json({ error: "Cart or Product not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateCart,
  AddProductToCart,
  GetCartProducts,
  DeleteCart,
  DeleteProductFromCart,
};

const ServiceResponse = require("../models/ServiceResponse");
const CartContainer = require("../models/DAOs/CartDAOMongoDB");
const ProdsContainer = require("../models/DAOs/ProductDAOMongoDB");
const carts = new CartContainer();
const products = new ProdsContainer();

const CreateCart = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const cartCreated = await carts.createCart();
    if (!cartCreated) {
      resp.success = false;
      resp.message = "Error al crear el carrito, intente nuevamente.";
      return res.status(400).json(resp);
    }

    resp.data = cartCreated;
    resp.message = "Carrito creado exitosamente!";
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};
const AddProductToCart = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;
    const { idProduct } = req.body;
    const prodToAdd = await products.getById(idProduct);

    if (!prodToAdd) {
      resp.success = false;
      resp.message = "El Producto que intentas añadir al carrito, no existe.";
      return res.status(404).json(resp);
    }
    const isAdded = await carts.addProductToCart(id, prodToAdd);
    if (!isAdded) {
      resp.success = false;
      resp.message = "No existe el carrito seleccionado.";
      return res.status(404).json(resp);
    }

    resp.message = "Producto añadido exitosamente!";
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};
const GetCartProducts = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;
    const cart = await carts.getById(id);

    if (!cart) {
      resp.success = false;
      resp.message = "El Carrito no existe.";
      return res.status(404).json(resp);
    }
    if (!cart.products.length) {
      resp.success = false;
      resp.message = "El Carrito no tiene productos aún";
      return res.status(400).json(resp);
    }

    resp.data = cart.products;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};
const DeleteCart = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;
    const isDeleted = await carts.deleteById(id);

    if (!isDeleted) {
      resp.success = false;
      resp.message = "El carrito que intestar eliminar, no existe.";
      return res.status(404).json(resp);
    }

    resp.message = "Carrito eliminado exitosamente!";
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};
const DeleteProductFromCart = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const { id, idProduct } = req.params;
    const isDeleted = await carts.deleteProductFromCart(id, idProduct);

    if (!isDeleted) {
      resp.success = false;
      resp.message = "El Carrito o Producto que intestar eliminar, no existe.";
      return res.status(404).json(resp);
    }

    resp.message = "Producto eliminado del Carrito exitosamente!";
    res.status(200).json(resp);
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

const ServiceResponse = require('../../Models/ServiceResponse');
const CartContainer = require('../../DataAccess/DAOs/CartDAO');
const ProdsContainer = require('../../DataAccess/DAOs/ProductDAO');
const Carts = new CartContainer();
const Products = new ProdsContainer();

const cartService = require('../services/cart.service');

async function CreateCart(req, res, next) {
  try {
    let userEmail = null;
    if (req.user) {
      userEmail = req.user.email;
    }
    let resp = await cartService.CreateCart(userEmail);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function AddProductToCart(req, res, next) {
  try {
    let resp = await cartService.AddProductToCart(req);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function GetCartProducts(req, res, next) {
  try {
    let resp = await cartService.GetCartProductsById(req.params.id);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function DeleteCart(req, res, next) {
  try {
    let resp = await cartService.DeleteCart(req.params.id);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function DeleteProductFromCart(req, res, next) {
  try {
    const { id, idProduct } = req.params;
    let resp = await cartService.DeleteProductFromCart(id, idProduct);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function DeleteProductSizeFromCart(req, res, next) {
  try {
    let resp = await cartService.DeleteProductSizeFromCart(req);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function ClearCart(req, res, next) {
  try {
    let resp = await cartService.ClearCart(req.params.id);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  CreateCart,
  AddProductToCart,
  GetCartProducts,
  DeleteCart,
  DeleteProductFromCart,
  DeleteProductSizeFromCart,
  ClearCart,
};

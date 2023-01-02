const prodService = require('../services/products.service');

async function GetAllProducts(req, res, next) {
  try {
    let resp = await prodService.GetAllProducts();
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function GetProductById(req, res, next) {
  try {
    let resp = await prodService.GetProductById(req.params.id);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function GetProductsByCategory(req, res, next) {
  try {
    let resp = await prodService.GetProductsByCategory(req.params.category);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function AddProduct(req, res, next) {
  try {
    let resp = await prodService.AddProduct(req.body);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function UpdateProduct(req, res, next) {
  try {
    let resp = await prodService.UpdateProduct(req);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function DeleteProduct(req, res, next) {
  try {
    let resp = await prodService.DeleteProduct(req.params.id);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  GetAllProducts,
  GetProductById,
  GetProductsByCategory,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};

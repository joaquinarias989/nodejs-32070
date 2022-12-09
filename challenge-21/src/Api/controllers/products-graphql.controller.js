const prodService = require('../services/products.service');

async function GetAllProducts(req, res, next) {
  try {
    let resp = await prodService.GetAllProducts();
    return resp.data;
  } catch (error) {
    next(error);
  }
}

async function GetProductById(req, res, next) {
  try {
    let resp = await prodService.GetProductById(req.params.id);
    return resp.data;
  } catch (error) {
    next(error);
  }
}

async function AddProduct(req, res, next) {
  try {
    let resp = await prodService.AddProduct(req.body);
    return resp.data;
  } catch (error) {
    next(error);
  }
}

async function UpdateProduct(req, res, next) {
  try {
    let resp = await prodService.UpdateProduct(req);
    return resp.data;
  } catch (error) {
    next(error);
  }
}

async function DeleteProduct(req, res, next) {
  try {
    let resp = await prodService.DeleteProduct(req.params.id);
    return resp.data;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  GetAllProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};

const ServiceResponse = require('../../Models/ServiceResponse');
const Container = require('../../DataAccess/DAOs/ProductDAO');
const products = new Container();

const GetProducts = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const prods = await products.getAll();

    if (!prods) {
      resp.success = false;
      resp.message = 'No hay productos en stock por el momento.';
      return res.status(404).json(resp);
    }

    resp.data = prods;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

const GetProductById = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;

    const product = await products.getById(id);
    if (!product) {
      resp.success = false;
      resp.message = 'El producto que intentas buscar no existe.';
      return res.status(404).json(resp);
    }

    resp.data = product;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

const AddProduct = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const { code, title, price, description, urlImg, color, stock, sizes } =
      req.body;
    const prod = await products.SaveProduct({
      code,
      title,
      price,
      description,
      urlImg,
      color,
      stock,
      sizes,
    });

    if (!prod) {
      resp.success = false;
      resp.message =
        'Ya existe un producto con el Código de producto ingresado.';
      return res.status(400).json(resp);
    }

    resp.data = prod;
    resp.message = 'Producto añadido exitosamente!';
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

const UpdateProduct = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    let { id } = req.params;
    const { title, price, description, urlImg, stock, sizes } = req.body;
    const prodToEdit = await products.getById(id);

    if (!prodToEdit) {
      resp.success = false;
      resp.message = 'El producto intentas modificar no existe.';
      return res.status(404).json(resp);
    }
    const isUpdated = await products.UpdateProduct({
      id,
      title,
      price,
      description,
      urlImg,
      stock,
      sizes,
    });
    if (isUpdated) {
      resp.message = 'Producto modificado exitosamente!';
      res.status(200).json(resp);
    } else {
      resp.success = false;
      resp.message = 'Error al modificar el Producto, verifique.';
      res.status(400).json(resp);
    }
  } catch (error) {
    next(error);
  }
};

const DeleteProduct = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    let { id } = req.params;
    const isDeleted = await products.deleteById(id);
    if (!isDeleted) {
      resp.success = false;
      resp.message = 'El producto que intentas eliminar, no existe.';
      return res.status(404).json(resp);
    }

    resp.message = 'Producto eliminado exitosamente!';
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};

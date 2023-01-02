const Container = require('../../DataAccess/DAOs/ProductDAO');
const ProductDTO = require('../../DataAccess/DTOs/ProductDTO');
const ServiceResponse = require('../../Models/ServiceResponse');
const Products = new Container();

async function GetAllProducts() {
  let resp = new ServiceResponse();

  try {
    const prods = await Products.GetAll();
    if (!prods) {
      resp.success = false;
      resp.status = 404;
      resp.message = 'No hay Productos en stock por el momento.';
      return resp;
    }

    resp.data = prods;
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Consultar los Productos. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function GetProductById(id) {
  let resp = new ServiceResponse();

  try {
    const prod = await Products.GetById(id);
    if (!prod) {
      resp.success = false;
      resp.status = 404;
      resp.message = 'El Producto que intentas buscar no existe.';
      return resp;
    }

    resp.data = prod;
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Consultar el Producto. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function GetProductsByCategory(category) {
  let resp = new ServiceResponse();

  try {
    const prods = await Products.GetProductsByCategory(category);
    if (!prods) {
      resp.success = false;
      resp.status = 404;
      resp.message = 'No hemos encontrado coincidencias con su búsqueda.';
      return resp;
    }

    resp.data = prods;
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Consultar los Productos. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function AddProduct(req) {
  let resp = new ServiceResponse();

  try {
    const {
      code,
      title,
      price,
      description,
      urlImg,
      color,
      category,
      stock,
      sizes,
    } = req;
    const prod = new ProductDTO({
      code,
      title,
      price,
      description,
      urlImg,
      color,
      category,
      stock,
      sizes,
    });
    let prodQuantities = [];
    for (let i = 0; i < prod.sizes.length; i++) {
      prodQuantities[i] = 0;
    }

    const prodSaved = await Products.SaveProduct({ ...prod, prodQuantities });
    if (!prodSaved) {
      resp.success = false;
      resp.status = 400;
      resp.message =
        'Ya existe un producto con el Código de producto ingresado.';
      return resp;
    }

    resp.data = prodSaved;
    resp.message = 'Producto agregado exitosamente!';
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Agregar el Producto. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function UpdateProduct(req) {
  let resp = new ServiceResponse();

  try {
    let { id } = req.params;
    const { title, price, description, urlImg, color, category, stock, sizes } =
      req.body;
    const prodToEdit = await Products.GetById(id);

    if (!prodToEdit) {
      resp.success = false;
      resp.status = 404;
      resp.message = 'El producto que intentas modificar no existe.';
      return resp;
    }
    const prod = new ProductDTO({
      code: null,
      title,
      price,
      description,
      urlImg,
      color,
      category,
      stock,
      sizes,
    });
    let prodQuantities = [];
    for (let i = 0; i < prod.sizes.length; i++) {
      prodQuantities[i] = 0;
    }

    const isUpdated = await Products.UpdateProduct(id, {
      ...prod,
      prodQuantities,
    });
    if (isUpdated) {
      resp.message = 'Producto modificado exitosamente!';
    } else {
      resp.success = false;
      resp.status = 400;
      resp.message =
        'Error al modificar el Producto, verifique los campos ingresados.';
    }

    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Modificar el Producto. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function DeleteProduct(id) {
  let resp = new ServiceResponse();

  try {
    const isDeleted = await Products.DeleteById(id);
    if (!isDeleted) {
      resp.success = false;
      resp.status = 404;
      resp.message = 'El producto que intentas eliminar, no existe.';
      return resp;
    }

    resp.message = 'Producto eliminado exitosamente!';
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Eliminar el Producto. Por favor, intente nuevamente.';
    throw resp;
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

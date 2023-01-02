const Container = require('../../DataAccess/DAOs/CartDAO');
const ProdsContainer = require('../../DataAccess/DAOs/ProductDAO');
const ServiceResponse = require('../../Models/ServiceResponse');
const Carts = new Container();
const Products = new ProdsContainer();

async function CreateCart(userEmail) {
  let resp = new ServiceResponse();

  try {
    const cartCreated = await Carts.CreateCart(userEmail);
    if (!cartCreated) {
      resp.success = false;
      resp.status = 400;
      resp.message = 'Error al crear el carrito, intente nuevamente.';
      return resp;
    }

    resp.data = cartCreated;
    resp.message = 'Carrito creado exitosamente!';
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message = 'Error al Crear el Carrito. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function AddProductToCart(req) {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;
    const { idProduct, size, quantity } = req.body;

    const prodToAdd = await Products.GetById(idProduct);
    if (!prodToAdd) {
      resp.success = false;
      resp.status = 404;
      resp.message = 'El Producto que intentas añadir al carrito, no existe.';
      return resp;
    }

    const error = await Carts.AddProductToCart(id, prodToAdd, size, quantity);
    if (error != '') {
      resp.success = false;
      resp.status = 400;
      resp.message = error;
      return resp;
    }

    resp.data = (await Carts.GetById(id)) ?? null;
    resp.message = `${prodToAdd.title} [ ${quantity} ] agregado al carrito!`;
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Agregar el Producto al Carrito. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function GetCartProductsById(id) {
  let resp = new ServiceResponse();

  try {
    const cart = await Carts.GetById(id);
    if (!cart) {
      resp.success = false;
      resp.status = 404;
      resp.message = 'No existe el Carrito seleccionado.';
      return resp;
    }
    if (!cart.products.length) {
      resp.success = false;
      resp.status = 400;
      resp.message = 'El Carrito no tiene productos aún';
      return resp;
    }

    resp.data = cart.products;
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Consultar los Productos del Carrito. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function DeleteCart(id) {
  let resp = new ServiceResponse();

  try {
    const isDeleted = await Carts.DeleteById(id);
    if (!isDeleted) {
      resp.success = false;
      resp.status = 404;
      resp.message = 'El carrito que intentas eliminar, no existe.';
      return resp;
    }

    resp.message = 'Carrito eliminado exitosamente!';
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Eliminar el Carrito. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function DeleteProductFromCart(id, idProduct) {
  let resp = new ServiceResponse();

  try {
    const error = await Carts.DeleteProductFromCart(id, idProduct);

    if (error != '') {
      resp.success = false;
      resp.status = 404;
      resp.message = error;
      return resp;
    }

    resp.data = (await Carts.GetById(id)) ?? null;
    resp.message = 'Producto eliminado exitosamente!';
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Eliminar el Producto del Carrito. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function DeleteProductSizeFromCart(req) {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;
    const { idProduct, size } = req.body;

    const prodToDelete = await Products.GetById(idProduct);
    if (!prodToDelete) {
      resp.success = false;
      resp.status = 404;
      resp.message =
        'El Producto que intentas eliminar del carrito, no existe.';
      return resp;
    }

    const error = await Carts.DeleteProductSizeFromCart(
      id,
      prodToDelete.id,
      size
    );
    if (error != '') {
      resp.success = false;
      resp.status = 400;
      resp.message = error;
      return resp;
    }

    resp.data = (await Carts.GetById(id)) ?? null;
    resp.message = `Talle eliminado exitosamente!`;
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Eliminar el Talle del Producto del Carrito. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function ClearCart(id) {
  let resp = new ServiceResponse();

  try {
    const error = await Carts.ClearCart(id);
    if (error !== '') {
      resp.success = false;
      resp.status = 404;
      resp.message = 'El carrito que intentas limpiar, no existe.';
      return resp;
    }

    resp.data = (await Carts.GetById(id)) ?? null;
    resp.message = 'Carrito limpiado exitosamente!';
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Limpiar el Carrito. Por favor, intente nuevamente.';
    throw resp;
  }
}

module.exports = {
  CreateCart,
  AddProductToCart,
  GetCartProductsById,
  DeleteCart,
  DeleteProductFromCart,
  DeleteProductSizeFromCart,
  ClearCart,
};

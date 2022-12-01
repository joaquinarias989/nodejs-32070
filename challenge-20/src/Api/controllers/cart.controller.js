const ServiceResponse = require('../../Models/ServiceResponse');
const CartContainer = require('../../DataAccess/DAOs/CartDAO');
const ProdsContainer = require('../../DataAccess/DAOs/ProductDAO');
const Carts = new CartContainer();
const Products = new ProdsContainer();

async function CreateCart(req, res, next) {
  let resp = new ServiceResponse();

  try {
    let userEmail = null;
    if (req.user) {
      userEmail = req.user.email;
    }
    const cartCreated = await Carts.CreateCart(userEmail);
    if (!cartCreated) {
      resp.success = false;
      resp.message = 'Error al crear el carrito, intente nuevamente.';
      return res.status(400).json(resp);
    }

    resp.data = cartCreated;
    resp.message = 'Carrito creado exitosamente!';
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
}
async function AddProductToCart(req, res, next) {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;
    const { idProduct, size, quantity } = req.body;

    const prodToAdd = await Products.getById(idProduct);
    if (!prodToAdd) {
      resp.success = false;
      resp.message = 'El Producto que intentas añadir al carrito, no existe.';
      return res.status(404).json(resp);
    }

    const error = await Carts.AddProductToCart(id, prodToAdd, size, quantity);
    if (error != '') {
      resp.success = false;
      resp.message = error;
      return res.status(400).json(resp);
    }

    resp.data = await Carts.getById(id);
    resp.message = `${prodToAdd.title} [ ${quantity} ] agregado al carrito!`;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
}
async function GetCartProducts(req, res, next) {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;
    const cart = await Carts.getById(id);

    if (!cart) {
      resp.success = false;
      resp.message = 'No existe el Carrito seleccionado';
      return res.status(404).json(resp);
    }
    if (!cart.products.length) {
      resp.success = false;
      resp.message = 'El Carrito no tiene productos aún';
      return res.status(404).json(resp);
    }

    resp.data = cart.products;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
}
async function DeleteCart(req, res, next) {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;
    const isDeleted = await Carts.deleteById(id);

    if (!isDeleted) {
      resp.success = false;
      resp.message = 'El carrito que intentas eliminar, no existe.';
      return res.status(404).json(resp);
    }

    resp.message = 'Carrito eliminado exitosamente!';
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
}
async function DeleteProductFromCart(req, res, next) {
  let resp = new ServiceResponse();

  try {
    const { id, idProduct } = req.params;
    const error = await Carts.DeleteProductFromCart(id, idProduct);

    if (error != '') {
      resp.success = false;
      resp.message = error;
      return res.status(404).json(resp);
    }

    resp.data = await Carts.getById(id);
    resp.message = 'Producto eliminado exitosamente!';
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
}
async function DeleteProductSizeFromCart(req, res, next) {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;
    const { idProduct, size } = req.body;

    const prodToDelete = await Products.getById(idProduct);
    if (!prodToDelete) {
      resp.success = false;
      resp.message =
        'El Producto que intentas eliminar del carrito, no existe.';
      return res.status(404).json(resp);
    }

    const error = await Carts.DeleteProductSizeFromCart(
      id,
      prodToDelete.id,
      size
    );
    if (error != '') {
      resp.success = false;
      resp.message = error;
      return res.status(400).json(resp);
    }

    resp.data = await Carts.getById(id);
    resp.message = `Talle eliminado exitosamente!`;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
}
async function ClearCart(req, res, next) {
  let resp = new ServiceResponse();

  try {
    const { id } = req.params;

    const error = await Carts.ClearCart(id);
    if (error !== '') {
      resp.success = false;
      resp.message = 'El carrito que intentas limpiar, no existe.';
      return res.status(404).json(resp);
    }

    resp.data = await Carts.getById(id);
    resp.message = 'Carrito limpiado exitosamente!';
    res.status(200).json(resp);
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

const ServiceResponse = require('../models/ServiceResponse');
const CartContainer = require('../models/DAOs/CartDAO');
const OrderContainer = require('../models/DAOs/OrderDAO');
const Carts = new CartContainer();
const Orders = new OrderContainer();

const CreateOrder = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const { idCart } = req.params;
    const cart = await Carts.getById(idCart);

    if (!cart) {
      resp.success = false;
      resp.message = 'El Carrito no existe.';
      return res.status(404).json(resp);
    }

    const order = await Orders.CreateOrder();

    resp.data = prods;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateOrder,
};

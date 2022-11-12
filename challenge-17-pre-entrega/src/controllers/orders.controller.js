const ServiceResponse = require('../models/ServiceResponse');
const CartContainer = require('../models/DAOs/CartDAO');
const OrderContainer = require('../models/DAOs/OrderDAO');
const Carts = new CartContainer();
const Orders = new OrderContainer();

const CreateOrder = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const { idCart } = req.body;
    const cart = await Carts.getById(idCart);

    if (!cart) {
      resp.success = false;
      resp.message = 'El Carrito no existe.';
      return res.status(404).json(resp);
    }

    let buyer;
    if (req.user) {
      const user = req.user;
      const document = req.body.buyer.document;

      buyer = {
        name: user.name,
        email: user.email,
        province: user.province,
        postalCode: user.postalCode,
        address: user.address,
        phone: user.email,
        document: document,
      };
    } else {
      buyer = req.body.buyer;
    }

    const order = await Orders.CreateOrder(cart, buyer);
    if (!order) {
      resp.success = false;
      resp.message = 'Error al crear la Orden. Intenta nuevamente.';
      return res.status(400).json(resp);
    }
    resp.data = order;
    resp.message = `Orden #${order.id} creada exitosamente!`;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

const GetUserOrders = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateOrder,
  GetUserOrders,
};

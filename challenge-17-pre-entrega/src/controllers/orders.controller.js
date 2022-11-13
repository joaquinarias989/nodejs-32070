const ServiceResponse = require('../models/ServiceResponse');
const CartContainer = require('../models/DAOs/CartDAO');
const ProductsContainer = require('../models/DAOs/ProductDAO');
const OrderContainer = require('../models/DAOs/OrderDAO');
const {
  SendSMSToBuyer,
  SendWhatsappToAdmin,
} = require('../services/phoneNotifys');
const { SendEmailToAdmin } = require('../services/emails');
const Carts = new CartContainer();
const Products = new ProductsContainer();
const Orders = new OrderContainer();

async function CreateOrder(req, res, next) {
  let resp = new ServiceResponse();

  try {
    const { idCart } = req.body;
    const cart = await Carts.getById(idCart);

    if (!cart) {
      resp.success = false;
      resp.message = 'El Carrito seleccionado no existe.';
      return res.status(404).json(resp);
    }

    // const error = await Products.VerifyStockOfPurchase(cart.products);
    // if (error != '') {
    //   resp.success = false;
    //   resp.message = error;
    //   return res.status(400).json(resp);
    // }

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
        phone: user.phone,
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

    await SendSMSToBuyer(buyer);

    const prodsList = order.products.map((item) => `<li>${item.title}</li>`);
    const htmlEmail = `¡Se ha realizado una nueva compra desde la Web! <br />
    <u>Datos del Comprador</u>: <br />
    Nombre y Apellido: ${buyer.name} <br />
    Email: ${buyer.email} <br />
    Provincia: ${buyer.province} <br />
    Dirección: ${buyer.address} <br />
    Nº Teléfono: ${buyer.phone} <br /><br />
    <u>Productos</u>: <br />
    <ul>${prodsList}</ul>
    `;
    await SendEmailToAdmin(`Nuevo Pedido #${order.id}`, htmlEmail);

    const prodsListWpp = order.products.map((item) => `${item.title}; `);
    const wppMsg = `¡Se ha realizado una nueva compra desde la Web!

    Datos del Comprador:
    Nombre y Apellido: ${buyer.name}
    Email: ${buyer.email}
    Provincia: ${buyer.province}
    Dirección: ${buyer.address}
    Nº Teléfono: ${buyer.phone}

    Productos:
    ${prodsListWpp}
    `;
    await SendWhatsappToAdmin(`Nuevo Pedido #${order.id}`, wppMsg);
    resp.data = order;
    resp.message = `Orden #${order.id} creada exitosamente! Gracias por comprar en STREET WEAR.`;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
}

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

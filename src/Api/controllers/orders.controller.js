const ServiceResponse = require('../../Models/ServiceResponse');
const CartContainer = require('../../DataAccess/DAOs/CartDAO');
const ProductsContainer = require('../../DataAccess/DAOs/ProductDAO');
const OrderContainer = require('../../DataAccess/DAOs/OrderDAO');
const {
  SendSMSToBuyer,
  SendWhatsappToAdmin,
} = require('../services/externals/phoneNotifys.service');
const { SendEmailToAdmin } = require('../services/externals/emails.service');
const Carts = new CartContainer();
const Products = new ProductsContainer();
const Orders = new OrderContainer();

async function CreateOrder(req, res, next) {
  let resp = new ServiceResponse();

  try {
    const { idCart } = req.body;
    const cart = await Carts.GetById(idCart);

    if (!cart) {
      resp.success = false;
      resp.status = 400;
      resp.message = 'El Carrito seleccionado no existe.';
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
        phone: user.phone,
        document: document,
      };
    } else {
      buyer = req.body.buyer;
    }

    const order = await Orders.CreateOrder(cart, buyer);
    if (!order) {
      resp.success = false;
      resp.status = 400;
      resp.message = 'Error al crear la Orden. Intenta nuevamente.';
      return res.status(400).json(resp);
    }

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

    if (process.env.ACCOUNT_SID || process.env.ACCOUNT_SID !== '') {
      await SendSMSToBuyer(buyer);

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
    }

    resp.data = order;
    resp.message = `Orden #${order.id} creada exitosamente! Gracias por comprar en STREET WEAR.`;
    res.status(200).json(resp);
  } catch (error) {
    resp.data = error;
    resp.message = 'Error al Crear la Orden. Por favor, intente nuevamente.';
    next(resp);
  }
}

const GetUserOrders = async (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    const orders = await Orders.GetAllByEmail(req.user.email);
    if (!orders) {
      resp.success = false;
      resp.status = 404;
      resp.message = 'No haz realizado ninguna compra aún';
      return res.status(resp.status).json(resp);
    }
    resp.data = orders;
    return res.status(resp.status).json(resp);
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Obtener las Compras. Por favor, intente nuevamente.';
    next(resp);
  }
};

module.exports = {
  CreateOrder,
  GetUserOrders,
};

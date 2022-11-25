const MongoDBContainer = require('../Containers/MongoDBContainer');
const orderSchema = require('../Schemas/Order');

class OrderDAO extends MongoDBContainer {
  constructor() {
    super('Order', orderSchema);
  }

  async CreateOrder(cart, buyer) {
    try {
      const newOrder = new this.model({
        buyer,
        idCart: cart.id,
        products: cart.products,
        timestamp: new Date(),
      });
      const savedOrder = await newOrder.save();

      return savedOrder ? savedOrder : null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = OrderDAO;

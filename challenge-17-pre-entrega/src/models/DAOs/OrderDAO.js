const MongoDBContainer = require('../Containers/MongoDBContainer');
const orderSchema = require('../Schemas/Order');

class OrderDAO extends MongoDBContainer {
  constructor() {
    super('Order', cartSchema);
  }

  async CreateOrder(cart) {
    try {
      const newOrder = new this.model({
        buyer: cart.userEmail,
        products: cart.products,
        timestamp: new Date(),
      });
      const savedOrder = await newOrder.save();

      return savedOrder ? savedOrder : null;
    } catch (error) {
      throw new Error(error.name);
    }
  }
}

module.exports = OrderDAO;

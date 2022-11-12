const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    buyer: {
      name: { type: String, required: true, max: 50 },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        max: 254,
      },
      province: { type: String, required: true, max: 50 },
      postalCode: { type: Number, required: true, length: 5 },
      address: { type: String, required: true, max: 254 },
      phone: { type: String, required: true, max: 40 },
      document: { type: String, required: true, max: 11 },
    },
    products: { type: Array, required: true, defaultValue: [] },
    timestamp: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = OrderSchema;

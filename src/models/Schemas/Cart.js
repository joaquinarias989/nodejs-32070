const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    products: { type: Array, required: true, defaultValue: [] },
    userEmail: {
      type: String,
      trim: true,
      max: 254,
    },
    timestamp: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = CartSchema;

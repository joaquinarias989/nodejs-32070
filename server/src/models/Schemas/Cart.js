const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    products: { type: Array, required: true, defaultValue: [] },
    timestamp: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = CartSchema;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    products: { type: Array, required: true, defaultValue: [] },
    timestamp: { type: Date, required: true },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max: 254,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = CartSchema;

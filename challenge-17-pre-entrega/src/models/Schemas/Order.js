const mongoose = require('mongoose');
const UserSchema = require('./User');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    buyer: {
      type: UserSchema,
      required: true,
      unique: true,
      trim: true,
      max: 254,
    },
    products: { type: Array, required: true, defaultValue: [] },
    timestamp: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = OrderSchema;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  products: { type: Array, require: true, defaultValue: [] },
  timestamp: { type: Date, require: true },
});

module.exports = cartSchema;

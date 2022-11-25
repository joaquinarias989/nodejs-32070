const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true, max: 6 },
    title: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    description: { type: String, required: false, max: 254 },
    urlImg: { type: String, required: true },
    color: { type: String, required: true },
    sizes: { type: Array, required: true, defaultValue: [] },
    stock: { type: Array, required: true, defaultValue: [] },
    quantities: { type: Array, required: true, defaultValue: [] },
    timestamp: { type: Date, required: true, defaultValue: new Date() },
  },
  {
    versionKey: false,
  }
);

module.exports = ProductSchema;

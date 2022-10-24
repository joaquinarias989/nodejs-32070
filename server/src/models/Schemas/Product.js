const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true, max: 6 },
    title: { type: String, required: true, max: 100 },
    price: { type: mongoose.Types.Decimal128, required: true },
    description: { type: String, required: false, max: 254 },
    urlImg: { type: String, required: true },
    stock: { type: String, required: true },
    timestamp: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = ProductSchema;

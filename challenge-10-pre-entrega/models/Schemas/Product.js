const mongoose = require("mongoose");
const { Schema } = mongoose;

const prodSchema = new Schema({
  code: { type: String, require: true, max: 6 },
  title: { type: String, require: true, max: 100 },
  price: { type: mongoose.Types.Decimal128, require: true, max: 100 },
  description: { type: String, require: false, max: 254 },
  urlImg: { type: String, require: true },
  stock: { type: String, require: true, max: 100 },
  timestamp: { type: Date, require: true },
});

module.exports = prodSchema;

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

// const prod = new Product({
//   code: "EJE",
//   title: "Producto de Ejemplo",
//   price: 3000.5,
//   description: "Prueba",
//   urlImg: "https://",
//   stock: 3,
//   timestamp: new Date(),
// });

// prod
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))
//   .finally(() => mongoose.connection.close());

// Product.find({})
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))
//   .finally(() => mongoose.connection.close());

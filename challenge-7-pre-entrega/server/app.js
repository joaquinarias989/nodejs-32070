const express = require("express");
const app = express();
const routerProds = require("./controllers/products");
const routerCart = require("./controllers/cart");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", routerProds);
app.use("/api/cart", routerCart);

app.use(notFound);
app.use(handleErrors);

module.exports = { app };

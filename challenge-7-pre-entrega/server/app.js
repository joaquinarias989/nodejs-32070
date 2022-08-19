const express = require("express");
const app = express();

const routerProds = express.Router();
const routerCart = express.Router();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", routerProds);
app.use("/api/cart", routerCart);

module.exports = { app, routerProds, routerCart };

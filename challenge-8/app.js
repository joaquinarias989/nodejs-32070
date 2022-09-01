const express = require("express");
const config = require("./config");
const routerAuth = require("./routes/auth.routes");
const routerProds = require("./routes/products.routes");
const routerCart = require("./routes/cart.routes");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");

const app = express();

//setings
app.set("port", config.port);

//views
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

//middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", routerAuth);
app.use("/api/products", routerProds);
app.use("/api/cart", routerCart);

app.use(notFound);
app.use(handleErrors);

module.exports = { app };

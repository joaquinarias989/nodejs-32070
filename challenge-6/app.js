const express = require("express");
const app = express();

const routerProds = express.Router();

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", routerProds);

module.exports = { app, routerProds };

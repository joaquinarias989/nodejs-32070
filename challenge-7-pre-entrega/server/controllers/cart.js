const routerCart = require("express").Router();

routerCart.get("/", async (req, res) => {
  res.send("En progreso");
});

module.exports = routerCart;

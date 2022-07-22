const { json } = require("express");
const express = require("express");
const app = express();
const Container = require("../challenge-2/Container");

const port = 8080;
app
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align:center'>Hi👋 For help with the API read the documentation <a href='https://github.com/joaquinarias989/nodejs-32070' target='_blank'>here📃</a></h1>"
  );
});

// GET PRODUCTS
app.get("/products", async (req, res) => {
  const container = new Container("../challenge-2/products.txt");
  const products = await prods.getAll();
  res.json(products || { error: "No products found" });
});

// GET RANDOM PRODUCT
app.get("/randomProduct", async (req, res) => {
  const container = new Container("../challenge-2/products.txt");
  const products = await container.getAll();
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  res.json(randomProduct || { error: "Oh! Not lucky this time" });
});

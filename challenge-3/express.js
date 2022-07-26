const express = require("express");
const Container = require("./Container");

const app = express();

app.use(express.json());

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

// GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  const container = new Container("./products.txt");
  const products = await container.getAll();
  products
    ? res.status(200).json(products)
    : res.status(404).json({ error: "No products found" });
});

// GET RANDOM PRODUCT
app.get("/api/randomProduct", async (req, res) => {
  const container = new Container("./products.txt");
  const products = await container.getAll();
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  randomProduct
    ? res.status(200).json(randomProduct)
    : res.status(404).json({ error: "Oh! Not lucky this time" });
});

// POST PRODUCT
app.post("/api/products", async (req, res) => {
  const container = new Container("./products.txt");
  const product = await container.save(req.body);
  product
    ? res.status(201).json({ message: "Product created successfully" })
    : res.status(404).json({ error: "Product not added" });
});

// PUT PRODUCT
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const container = new Container("./products.txt");
  const deleteProd = await container.deleteById(Number(id));
  const product = await container.save(req.body);
  product
    ? res.status(200).json({ message: "Product updated successfully" })
    : res.status(404).json({ error: "Product not updated, verify error" });
});

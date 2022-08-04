const express = require("express");

const Container = require("./Container");

const app = express();
const routerProds = express.Router();
app.use(express.static(__dirname + "public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", routerProds);

routerProds.get("/addProduct", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

routerProds.get("/", async (req, res) => {
  const container = new Container("./products.txt");
  const products = await container.getAll();
  products
    ? res.status(200).json(products)
    : res.status(404).json({ error: "No products found" });
});
routerProds.get("/:id", async (req, res) => {
  const { id } = req.params;
  const container = new Container("./products.txt");
  const product = await container.getById(Number(id));
  product
    ? res.status(200).json(product)
    : res.status(404).json({ error: "Product not found" });
});
routerProds.post("/", async (req, res) => {
  const { title, price, stock } = req.body;
  console.log(title, price, stock);
  const container = new Container("./products.txt");
  const idProd = await container.save({ title, price, stock });
  idProd
    ? res
        .status(201)
        .json({ message: "Product added successfully!", idProduct: idProd })
    : res.status(400).json({
        error: "Something went wrong, the product was not added. Verify error.",
      });
});
routerProds.put("/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const { title, price, stock } = req.body;
  const container = new Container("./products.txt");
  const product = await container.update({ id, title, price, stock });
  product
    ? res.status(200).json({ message: "Product updated successfully!" })
    : res.status(404).json({
        error:
          "Something went wrong, the product was not updated. Verify error.",
      });
});
routerProds.delete("/:id", async (req, res) => {
  let { id } = req.params;
  const container = new Container("./products.txt");
  const isDeleted = await container.deleteById(Number(id));
  isDeleted
    ? res.status(200).json({ message: "Product deleted successfully!" })
    : res.status(404).json({
        error:
          "Something went wrong, the product was not deleted. Verify error.",
      });
});

const PORT = process.env.PORT || 8080;
const server = app
  .listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });

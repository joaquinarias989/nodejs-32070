const express = require("express");
const Container = require("./data/Container");
const products = new Container("./products.txt");

const app = express();
const routerProds = express.Router();

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", routerProds);

app.get("/", (req, res) => {
  res.render("pages/index", {page_name: "index"});
});
app.get("/Productos", async (req, res) => {
  res.render("pages/products", { prods: await products.getAll(), page_name: "products"
   });
});
app.get("/AgregarProducto", (req, res) => {
  res.render("pages/addProduct");
});

routerProds.get("/", async (req, res) => {
  const prods = await products.getAll();
  prods
    ? res.status(200).json(prods)
    : res.status(404).json({ error: "No products found" });
});
routerProds.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await products.getById(Number(id));
  product
    ? res.status(200).json(product)
    : res.status(404).json({ error: "Product not found" });
});
routerProds.post("/", async (req, res) => {
  const { title, price, img } = req.body;
  const idProd = await products.save({ title, price, img });
  idProd
    ? res
        .status(201)
        // .json({ message: "Product added successfully!", idProduct: idProd })
        .redirect("/Productos")
    : res.status(400).json({
        error: "Something went wrong, the product was not added. Verify error.",
      });
});
routerProds.put("/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const { title, price, img } = req.body;
  const product = await products.update({ id, title, price, img });
  product
    ? res.status(200).json({ message: "Product updated successfully!" })
    : res.status(404).json({
        error:
          "Something went wrong, the product was not updated. Verify error.",
      });
});
routerProds.delete("/:id", async (req, res) => {
  let { id } = req.params;
  const isDeleted = await products.deleteById(Number(id));
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

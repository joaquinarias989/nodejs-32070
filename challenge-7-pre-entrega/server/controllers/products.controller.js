const Container = require("../data/ProductsContainer");
const products = new Container("./data/products.json");

const GetProducts = async (req, res, next) => {
  try {
    const prods = await products.getAll();
    prods
      ? res.status(200).json(prods)
      : res.status(404).json({ error: "No products found" });
  } catch (error) {
    next(error);
  }
};
const GetProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await products.getById(Number(id));
    product
      ? res.status(200).json(product)
      : res.status(404).json({ error: "Product not found" });
  } catch (error) {
    next(error);
  }
};
const AddProduct = async (req, res, next) => {
  try {
    const { title, price, img } = req.body;
    const idProd = await products.save({ title, price, img });
    idProd
      ? res
          .status(201)
          // .json({ message: "Product added successfully!", idProduct: idProd })
          .redirect("/AgregarProducto")
      : res.status(400).json({
          error:
            "Something went wrong, the product was not added. Verify error.",
        });
  } catch (error) {
    next(error);
  }
};
const UpdateProduct = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
const DeleteProduct = async (req, res, next) => {
  try {
    let { id } = req.params;
    const isDeleted = await products.deleteById(Number(id));
    isDeleted
      ? res.status(200).json({ message: "Product deleted successfully!" })
      : res.status(404).json({
          error:
            "Something went wrong, the product was not deleted. Verify error.",
        });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
};

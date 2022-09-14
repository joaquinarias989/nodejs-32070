const Container = require("../models/DAOs/ProductDAOFileSystem");
const products = new Container();

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
    const product = await products.getById(parseInt(id));
    product
      ? res.status(200).json(product)
      : res.status(404).json({ error: "Product not found" });
  } catch (error) {
    next(error);
  }
};
const AddProduct = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token !== "admin-token")
      return res
        .status(401)
        .json({ error: "You not have access to this resource" });

    const { code, title, price, description, urlImg, stock } = req.body;
    const prod = await products.save({
      code,
      title,
      price,
      description,
      urlImg,
      stock,
    });
    prod
      ? res
          .status(201)
          .json({ message: "Product added successfully!", data: prod })
      : res.status(400).json({
          error: "Something went wrong, the product was not added. Verify.",
        });
  } catch (error) {
    next(error);
  }
};
const UpdateProduct = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token !== "admin-token")
      return res
        .status(401)
        .json({ error: "You not have access to this resource" });

    let { id } = req.params;
    id = Number(id);
    const { title, price, description, urlImg, stock } = req.body;
    const prodToEdit = await products.getById(id);
    if (!prodToEdit)
      return res.status(404).json({ error: "Product not found" });
    const isUpdated = await products.update({
      id,
      title,
      price,
      description,
      urlImg,
      stock,
    });
    isUpdated
      ? res.status(200).json({ message: "Product updated successfully!" })
      : res.status(400).json({
          error:
            "Something went wrong, the product was not updated. Verify error.",
        });
  } catch (error) {
    next(error);
  }
};
const DeleteProduct = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token !== "admin-token")
      return res
        .status(401)
        .json({ error: "You not have access to this resource" });

    let { id } = req.params;
    const isDeleted = await products.deleteById(Number(id));
    isDeleted
      ? res.status(200).json({ message: "Product deleted successfully!" })
      : res.status(404).json({
          error: "Product not found",
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

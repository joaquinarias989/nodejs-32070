const router = require("express").Router();
const {
  GetProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/products.controller");

router.get("/", GetProducts);
router.get("/:id", GetProductById);
router.post("/", AddProduct);
router.put("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

module.exports = router;

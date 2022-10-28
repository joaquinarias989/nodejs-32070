const router = require("express").Router();
const { VerifyUserAuthenticated } = require("../controllers/auth.controller");
const {
  GetProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/products.controller");

router.get("/", GetProducts);
router.get("/:id", GetProductById);
router.post("/", VerifyUserAuthenticated, AddProduct);
router.put("/:id", VerifyUserAuthenticated, UpdateProduct);
router.delete("/:id", VerifyUserAuthenticated, DeleteProduct);

module.exports = router;

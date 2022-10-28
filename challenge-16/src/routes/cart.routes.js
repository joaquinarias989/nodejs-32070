const router = require("express").Router();
const {
  CreateCart,
  AddProductToCart,
  GetCartProducts,
  DeleteCart,
  DeleteProductFromCart,
} = require("../controllers/cart.controller");

router.post("/", CreateCart);
router.post("/:id/products", AddProductToCart);
router.get("/:id/products", GetCartProducts);
router.delete("/:id", DeleteCart);
router.delete("/:id/products/:idProduct", DeleteProductFromCart);

module.exports = router;

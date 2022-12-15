const router = require('express').Router();
const {
  CreateCart,
  AddProductToCart,
  GetCartProducts,
  DeleteCart,
  DeleteProductFromCart,
  DeleteProductSizeFromCart,
  ClearCart,
} = require('../controllers/cart.controller');

router.post('/', CreateCart);
router.post('/:id/products', AddProductToCart);
router.put('/:id/products', DeleteProductSizeFromCart);
router.get('/:id/products', GetCartProducts);
router.delete('/:id', DeleteCart);
router.delete('/:id/products/:idProduct', DeleteProductFromCart);
router.delete('/:id/products', ClearCart);

module.exports = router;

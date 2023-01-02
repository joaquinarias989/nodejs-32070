const router = require('express').Router();
const { VerifyUserAuthenticated } = require('../controllers/auth.controller');
const {
  GetAllProducts,
  GetProductById,
  GetProductsByCategory,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require('../controllers/products.controller');

router.get('/', GetAllProducts);
router.get('/product/:id', GetProductById);
router.get('/:category', GetProductsByCategory);

if (process.env.ENV === 'TEST') {
  router.post('/', AddProduct);
  router.put('/:id', UpdateProduct);
  router.delete('/:id', DeleteProduct);
} else {
  router.post('/', VerifyUserAuthenticated, AddProduct);
  router.put('/:id', VerifyUserAuthenticated, UpdateProduct);
  router.delete('/:id', VerifyUserAuthenticated, DeleteProduct);
}

module.exports = router;

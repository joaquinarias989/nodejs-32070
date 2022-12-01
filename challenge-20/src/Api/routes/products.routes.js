const router = require('express').Router();
const { VerifyUserAuthenticated } = require('../controllers/auth.controller');
const {
  GetAllProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require('../controllers/products.controller');

router.get('/', GetAllProducts);
router.get('/:id', GetProductById);
router.post('/', VerifyUserAuthenticated, AddProduct);
router.put('/:id', VerifyUserAuthenticated, UpdateProduct);
router.delete('/:id', VerifyUserAuthenticated, DeleteProduct);

module.exports = router;

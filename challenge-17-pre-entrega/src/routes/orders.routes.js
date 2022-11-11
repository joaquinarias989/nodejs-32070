const router = require('express').Router();
const {
  CreateOrder,
  GetUserOrders,
} = require('../controllers/products.controller');

router.post('/:idCart', CreateOrder);
router.get('/:userId', GetUserOrders);

module.exports = router;

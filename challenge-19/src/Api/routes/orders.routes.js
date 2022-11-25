const router = require('express').Router();
const {
  CreateOrder,
  GetUserOrders,
} = require('../controllers/orders.controller');

router.post('/', CreateOrder);
router.get('/:userId', GetUserOrders);

module.exports = router;

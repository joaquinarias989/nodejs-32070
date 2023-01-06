const router = require('express').Router();
const { VerifyUserAuthenticated } = require('../controllers/auth.controller');
const {
  CreateOrder,
  GetUserOrders,
} = require('../controllers/orders.controller');

router.post('/', CreateOrder);
router.get('/', VerifyUserAuthenticated, GetUserOrders);

module.exports = router;

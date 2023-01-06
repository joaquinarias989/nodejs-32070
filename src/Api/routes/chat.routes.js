const router = require('express').Router();
const { VerifyUserAuthenticated } = require('../controllers/auth.controller');
const { GetAllMsgsByEmail } = require('../controllers/chat.controller');

router.get('/:email', VerifyUserAuthenticated, GetAllMsgsByEmail);

module.exports = router;

const router = require("express").Router();
const { Login, Logout } = require("../controllers/auth.controller");

router.post("/login", Login);
router.delete("/logout", Logout);

module.exports = router;

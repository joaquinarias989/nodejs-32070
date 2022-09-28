const router = require("express").Router();
const {
  Login,
  Logout,
  VerifyUserAuthenticated,
  GetUserAuthenticated,
} = require("../controllers/auth.controller");

router.post("/login", Login);
router.delete("/logout", VerifyUserAuthenticated, Logout);
router.get("/user-logued", GetUserAuthenticated);

module.exports = router;

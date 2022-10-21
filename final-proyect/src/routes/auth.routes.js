const router = require("express").Router();
const {
  Login,
  Logout,
  Register,
  VerifyUserAuthenticated,
  GetUserAuthenticated,
} = require("../controllers/auth.controller");
const passport = require("../middlewares/passport");

router.post("/login", Login);
router.delete("/logout", VerifyUserAuthenticated, Logout);
router.post("/signUp", Register);
router.get("/user-logued", GetUserAuthenticated);

router.get("/login-error", (req, res) => {
  res
    .status(400)
    .send("<h1>Error al Iniciar Sesión. Por favor, intente nuevamente.</h1>");
});

module.exports = router;

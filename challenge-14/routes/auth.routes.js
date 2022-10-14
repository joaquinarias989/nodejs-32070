const router = require("express").Router();
const {
  Login,
  Logout,
  Register,
  VerifyUserAuthenticated,
  GetUserAuthenticated,
} = require("../controllers/auth.controller");
const passport = require("../middlewares/passport");

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "login-error" }),
  Login
);
router.delete("/logout", VerifyUserAuthenticated, Logout);
router.post(
  "/signUp",
  passport.authenticate("signUp", { failureRedirect: "signup-error" }),
  Register
);
router.get("/user-logued", GetUserAuthenticated);

// Error pages
router.get("/login-error", (req, res) => {
  res
    .status(400)
    .send("<h1>Error al Iniciar Sesión. Por favor, intente nuevamente.</h1>");
});
router.get("/signup-error", (req, res) => {
  res
    .status(400)
    .send(
      "<h1>Error al Registrar el Usuario. Por favor, intente nuevamente.</h1>"
    );
});

module.exports = router;

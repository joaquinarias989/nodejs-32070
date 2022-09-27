const router = require("express").Router();
const {
  Login,
  Logout,
  VerifyUserAuthenticated,
} = require("../controllers/auth.controller");

router.post("/login", Login);
router.delete("/logout", VerifyUserAuthenticated, Logout);
router.get("/prueba", VerifyUserAuthenticated, (req, res, next) => {
  res.send("HOLA");
});

module.exports = router;

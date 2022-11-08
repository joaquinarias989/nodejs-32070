const router = require("express").Router();
const {
  Login,
  Logout,
  SignUp,
  VerifyUserAuthenticated,
  GetUserAuthenticated,
  HandleLoginSuccess,
  HandleLoginError,
  HandleSignUpSuccess,
  HandleSignUpError,
} = require("../controllers/auth.controller");

router.post("/login", Login);
router.delete("/logout", VerifyUserAuthenticated, Logout);
router.post("/signUp", SignUp);

router.get("/user-logued", GetUserAuthenticated);

router.get("/login-success", HandleLoginSuccess);
router.get("/login-error", HandleLoginError);

router.get("/signUp-success", HandleSignUpSuccess);
router.get("/signUp-error", HandleSignUpError);

module.exports = router;

const ServiceResponse = require("../models/ServiceResponse");
const passport = require("../middlewares/passport");

const Login = passport.authenticate("login", {
  successRedirect: "/api/auth/login-success",
  failureRedirect: "/api/auth/login-error",
  failureFlash: true,
});

const SignUp = passport.authenticate("signUp", {
  successRedirect: "/api/auth/signUp-success",
  failureRedirect: "/api/auth/signUp-error",
  failureFlash: true,
});

const Logout = async (req, res, next) => {
  const resp = new ServiceResponse();

  try {
    if (req.user) {
      const { username } = req.user;
      req.logout(() => {
        resp.message = `Hasta pronto ${username}!`;
        res.status(200).json(resp);
      });
    } else {
      resp.success = false;
      resp.message = "Aún no has iniciado sesión.";
      res.status(401).json(resp);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const VerifyUserAuthenticated = async (req, res, next) => {
  const resp = new ServiceResponse();

  try {
    if (!req.isAuthenticated()) {
      resp.success = false;
      resp.message = `No has iniciado sesión, o la misma ha vencido. Por favor, ingresa nuevamente.`;
      res.status(401).json(resp);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const GetUserAuthenticated = async (req, res, next) => {
  const resp = new ServiceResponse();

  try {
    if (!req.user) {
      resp.success = false;
      resp.message = `No has iniciado sesión, o la misma ha vencido. Por favor, ingresa nuevamente.`;
      res.status(401).json(resp);
    } else {
      const { username } = req.user;
      resp.success = true;
      resp.data = username;
      res.status(200).json(resp);
    }
  } catch (error) {
    next(error);
  }
};

const HandleLoginSuccess = async (req, res, next) => {
  const resp = new ServiceResponse();
  resp.message = "Sesión iniciada exitosamente";

  res.status(200).json(resp);
};
const HandleLoginError = async (req, res, next) => {
  const resp = new ServiceResponse();
  resp.success = false;
  resp.message = "Usuario y/o contraseña incorrecta.";

  res.status(400).json(resp);
};

const HandleSignUpSuccess = async (req, res, next) => {
  const resp = new ServiceResponse();
  resp.message = "Usuario registrado exitosamente";

  res.status(200).json(resp);
};
const HandleSignUpError = async (req, res, next) => {
  const resp = new ServiceResponse();
  resp.success = false;
  resp.message =
    "Error al registrar el usuario. Por favor, intente nuevamente.";

  res.status(400).json(resp);
};

module.exports = {
  Login,
  Logout,
  SignUp,
  VerifyUserAuthenticated,
  GetUserAuthenticated,
  HandleLoginSuccess,
  HandleLoginError,
  HandleSignUpSuccess,
  HandleSignUpError,
};

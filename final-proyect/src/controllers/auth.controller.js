const ServiceResponse = require("../models/ServiceResponse");
const passport = require("../middlewares/passport");

const Login = async (req, res, next) => {
  try {
    passport.authenticate("login", {
      failureFlash: true,
    });
  } catch (error) {
    next(error);
  }
};

const Register = async (req, res, next) => {
  try {
    passport.authenticate("signUp", {
      failureRedirect: "signUp",
      failureFlash: true,
    });
  } catch (error) {
    next(error);
  }
};

const Logout = async (req, res, next) => {
  const resp = new ServiceResponse((data = ""));

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
  const resp = new ServiceResponse((data = ""));

  try {
    if (!req.user) {
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
  const resp = new ServiceResponse((data = ""));

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

module.exports = {
  Login,
  Logout,
  Register,
  VerifyUserAuthenticated,
  GetUserAuthenticated,
};

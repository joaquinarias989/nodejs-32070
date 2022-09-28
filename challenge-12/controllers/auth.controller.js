const ServiceResponse = require("../models/ServiceResponse.js");

const Login = async (req, res, next) => {
  try {
    const { username } = req.body;

    if (!username || username.trim() === "") {
      res.status(400).json({
        data: "",
        success: false,
        message: "Debes ingresar un usuario válido",
      });
    } else {
      req.session.username = username;
      // res.status(200).json({
      //   data: "admin-token",
      //   success: true,
      //   message: `Bienvenido de nuevo ${username}!`,
      // });
      res.status(200).redirect("/");
    }
  } catch (error) {
    next(error);
  }
};

const Logout = async (req, res, next) => {
  const resp = new ServiceResponse();
  resp.data = "";

  try {
    const { username } = req.session;
    if (username) {
      req.session.destroy((err) => {
        console.log(err);
        if (err) {
          resp.success = false;
          resp.message = `Ocurrió un error con la sesión. Por favor, ingresa nuevamente.`;
          res.status(401).json(resp);
        } else {
          resp.message = `Hasta luego ${username}!`;
          res.status(200).json(resp);
        }
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
    const { username } = req.session;
    if (!username) {
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
    const { username } = req.session;
    if (!username) {
      resp.success = false;
      resp.message = `No has iniciado sesión, o la misma ha vencido. Por favor, ingresa nuevamente.`;
      res.status(401).json(resp);
    } else {
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
  VerifyUserAuthenticated,
  GetUserAuthenticated,
};

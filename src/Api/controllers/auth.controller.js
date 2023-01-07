const ServiceResponse = require('../../Models/ServiceResponse');
const authService = require('../services/auth.service');
const passport = require('../middlewares/passport');
const { SendEmailNewUser } = require('../services/externals/emails.service');

const Login = passport.authenticate('login', {
  successRedirect: '/api/auth/login/success',
  failureRedirect: '/api/auth/login/error',
});

const SignUp = passport.authenticate('signUp', {
  successRedirect: 'signUp/success',
  failureRedirect: 'signUp/error',
});

async function Logout(req, res, next) {
  let resp = new ServiceResponse();

  try {
    if (req.user) {
      const { name } = req.user;
      req.logout(() => {
        resp.message = `Hasta pronto ${name}!`;
        return res.status(resp.status).json(resp);
      });
    } else {
      resp.success = false;
      resp.status = 404;
      resp.message = 'Aún no has iniciado sesión.';
      res.status(resp.status).json(resp);
    }
  } catch (error) {
    resp.data = error;
    resp.message = 'Error al Cerrar la Sesión. Por favor, intente nuevamente.';
    next(resp);
  }
}

async function VerifyUserAuthenticated(req, res, next) {
  let resp = new ServiceResponse();

  try {
    if (!req.isAuthenticated()) {
      resp.success = false;
      resp.status = 401;
      resp.message = `No has iniciado sesión, o la misma ha vencido. Por favor, ingresa nuevamente.`;
      res.status(resp.status).json(resp);
    } else {
      next();
    }
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al verificar el Usuario autenticado. Por favor, intente nuevamente.';
    next(resp);
  }
}

const GetUserAuthenticated = async (req, res, next) => {
  try {
    let resp = await authService.GetUserAuthenticated(req);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
};

const HandleLoginSuccess = async (req, res, next) => {
  const resp = new ServiceResponse();
  resp.data = req.user;
  resp.message = 'Sesión iniciada exitosamente';

  res.status(resp.status).json(resp);
};
const HandleLoginError = async (req, res, next) => {
  const resp = new ServiceResponse();
  resp.success = false;
  resp.status = 400;
  resp.message = 'Usuario y/o contraseña incorrecta.';

  res.status(resp.status).json(resp);
};

const HandleSignUpSuccess = async (req, res, next) => {
  const resp = new ServiceResponse();
  try {
    const user = req.user;

    await SendEmailNewUser(user);
    resp.data = user;
    resp.status = 200;
    resp.message = 'Te has registrado exitosamente!';

    res.status(resp.status).json(resp);
  } catch (error) {
    resp.data = error;
    resp.message = 'Error al Registrarse. Por favor, intente nuevamente.';
    next(resp);
  }
};
const HandleSignUpError = async (req, res, next) => {
  const resp = new ServiceResponse();
  try {
    resp.success = false;
    resp.status = 400;
    resp.message =
      'Algo salió mal al intentar registrarte en nuestro Sistema. Por favor, intenta nuevamente.';

    res.status(resp.status).json(resp);
  } catch (error) {
    resp.data = error;
    resp.message = 'Error al Registrarse. Por favor, intente nuevamente.';
    next(resp);
  }
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

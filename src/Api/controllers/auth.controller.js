const ServiceResponse = require('../../Models/ServiceResponse');
const authService = require('../services/auth.service');
const passport = require('../middlewares/passport');
const { SendEmailNewUser } = require('../services/externals/emails.service');

const Login = passport.authenticate('login', {
  successRedirect: '/api/auth/login-success',
  failureRedirect: '/api/auth/login-error',
});

const SignUp = passport.authenticate('signUp', {
  successRedirect: '/api/auth/signUp-success',
  failureRedirect: '/api/auth/signUp-error',
});

async function Logout(req, res, next) {
  try {
    let resp = await authService.Logout(req);
    res.status(resp.status).json(resp);
  } catch (error) {
    next(error);
  }
}

async function VerifyUserAuthenticated(req, res, next) {
  let resp = new ServiceResponse();

  try {
    if (!req.isAuthenticated()) {
      resp.success = false;
      resp.message = `No has iniciado sesión, o la misma ha vencido. Por favor, ingresa nuevamente.`;
      res.status(401).json(resp);
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

  res.status(200).json(resp);
};
const HandleLoginError = async (req, res, next) => {
  const resp = new ServiceResponse();
  resp.success = false;
  resp.message = 'Usuario y/o contraseña incorrecta.';

  res.status(400).json(resp);
};

const HandleSignUpSuccess = async (req, res, next) => {
  const resp = new ServiceResponse();
  const user = req.user;

  await SendEmailNewUser(user);
  resp.data = user;
  resp.message = 'Te has registrado exitosamente!';

  res.status(200).json(resp);
};
const HandleSignUpError = async (req, res, next) => {
  const resp = new ServiceResponse();
  resp.success = false;
  resp.message =
    'Algo salió mal al intentar registrarte en nuestro Sistema. Por favor, intenta nuevamente.';

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

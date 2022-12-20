const ServiceResponse = require('../../Models/ServiceResponse');
const logger = require('../services/logger.service');

async function Logout(req) {
  let resp = new ServiceResponse();

  try {
    if (req.user) {
      const { name } = req.user;
      req.logout(() => {});
      resp.message = `Hasta pronto ${name}!`;
    } else {
      resp.success = false;
      resp.status = 401;
      resp.message = 'Aún no has iniciado sesión.';
    }
    return resp;
  } catch (error) {
    resp.data = error;
    resp.message = 'Error al Cerrar la Sesión. Por favor, intente nuevamente.';
    throw resp;
  }
}

async function GetUserAuthenticated(req) {
  let resp = new ServiceResponse();

  try {
    if (!req.user) {
      resp.success = false;
      resp.status = 401;
      resp.message = `No has iniciado sesión, o la misma ha vencido. Por favor, ingresa nuevamente.`;
    } else {
      resp.data = req.user;
      resp.success = true;
    }

    return resp;
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al obtener el Usuario autenticado. Por favor, intente nuevamente.';
    throw resp;
  }
}

module.exports = { Logout, GetUserAuthenticated };

const ServiceResponse = require('../../Models/ServiceResponse');

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

module.exports = { GetUserAuthenticated };

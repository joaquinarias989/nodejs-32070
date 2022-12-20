const logger = require('../services/logger.service');
const ServiceResponse = require('../../Models/ServiceResponse');

module.exports = (req, res, next) => {
  logger.log('warn', `RUTA: ${req.path}, METODO: ${req.method}`);

  let resp = new ServiceResponse();
  resp.status = 404;
  resp.success = false;
  resp.message = 'El endpoint que intentas consumir no existe';

  res.status(resp.status).json(resp);
};

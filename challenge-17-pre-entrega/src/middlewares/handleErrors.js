const logger = require('../services/logger');
const ServiceResponse = require('../models/ServiceResponse');

module.exports = (error, req, res, next) => {
  logger.log(
    'error',
    `RUTA: ${req.originalUrl}, METODO: ${req.method}, ERROR: ${error}`
  );

  let resp = new ServiceResponse();
  resp.success = false;

  if (error.toString().includes('CastError')) {
    resp.message = 'Debes ingresar un ID válido.';
    res.status(400).json(resp);
  } else if (error.toString().includes('duplicate key')) {
    resp.message = 'El elemento que intentas añadir ya existe';
    res.status(400).json(resp);
  } else if (error.toString().includes('format')) {
    (resp.message = error.toString()), res.status(400).json(resp);
  } else {
    resp.message = 'Algo salió mal. Por favor, intenta nuevamente.';
    res.status(500).json(resp);
  }
};

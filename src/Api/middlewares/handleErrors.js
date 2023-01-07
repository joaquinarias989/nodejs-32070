const logger = require('../services/logger.service');

module.exports = (error, req, res, next) => {
  logger.log(
    'error',
    `RUTA: ${req.originalUrl}, METODO: ${req.method}, ERROR: ${error.data}`
  );

  error.success = false;
  error.status = 400;

  const errorData = error.data?.toString();
  if (errorData?.includes('CastError')) {
    error.message = 'Debes ingresar un ID válido.';
  } else if (errorData?.includes('duplicate key')) {
    error.message = 'El elemento que intentas añadir ya existe';
  } else if (errorData?.includes('format')) {
    error.message = errorData;
  } else {
    error.status = 500;
  }
  res.status(error.status).json(error);
};

const logger = require('../services/logger.service');

module.exports = (error, req, res, next) => {
  logger.log(
    'error',
    `RUTA: ${req.originalUrl}, METODO: ${req.method}, ERROR: ${error.data}`
  );

  error.success = false;
  const errorData = error.data.toString();
  if (errorData.includes('CastError')) {
    error.message = 'Debes ingresar un ID válido.';
    res.status(400).json(error);
  } else if (errorData.includes('duplicate key')) {
    error.message = 'El elemento que intentas añadir ya existe';
    res.status(400).json(error);
  } else if (errorData.includes('format')) {
    error.message = errorData;
    res.status(400).json(error);
  } else {
    res.status(500).json(error);
  }
};

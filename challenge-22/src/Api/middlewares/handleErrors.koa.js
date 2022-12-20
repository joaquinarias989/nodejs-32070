const logger = require('../services/logger.service');

module.exports = async (error, ctx, next) => {
  logger.log(
    'error',
    `RUTA: ${ctx.request.originalUrl}, METODO: ${ctx.request.method}, ERROR: ${error.data}`
  );

  error.success = false;
  if (error.data.toString().includes('CastError')) {
    error.message = 'Debes ingresar un ID válido.';
    ctx.status = 400;
    ctx.body = error;
  } else if (error.data.toString().includes('duplicate key')) {
    error.message = 'El elemento que intentas añadir ya existe';
    ctx.status = 400;
    ctx.body = error;
  } else if (error.data.toString().includes('format')) {
    error.message = error.data.toString();
    ctx.status = 400;
    ctx.body = error;
  } else {
    ctx.status = 500;
    ctx.body = error;
  }
};

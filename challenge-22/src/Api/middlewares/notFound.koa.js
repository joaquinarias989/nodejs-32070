const logger = require('../services/logger.service');

module.exports = (ctx, next) => {
  logger.log(
    'warn',
    `RUTA: ${ctx.request.path}, METODO: ${ctx.request.method}`
  );
  ctx.body = { error: 'The endpoint you are trying to access does not exist' };
};

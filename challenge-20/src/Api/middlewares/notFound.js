const logger = require('../services/logger.service');

module.exports = (req, res, next) => {
  logger.log('warn', `RUTA: ${req.path}, METODO: ${req.method}`);
  res
    .status(404)
    .json({ error: 'The endpoint you are trying to access does not exist' });
};

const logger = require('../services/logger.service');
const { arg } = require('../config');

const GetProyectInfo = async (req, res, next) => {
  try {
    logger.log(
      'info',
      `RUTA: api/env${req.originalUrl}, METODO: ${req.method}`
    );

    info = {
      args: JSON.stringify(arg),
      platform: process.platform,
      version: process.version,
      memory: JSON.stringify(process.memoryUsage()),
      path: process.execPath,
      pid: process.pid,
      dir: process.cwd(),
    };

    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetProyectInfo,
};

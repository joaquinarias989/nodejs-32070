const logger = require("../services/logger");
const { arg } = require("../config");

const GetProyectInfo = async (req, res, next) => {
  try {
    info = {
      args: JSON.stringify(arg),
      platform: process.platform,
      version: process.version,
      memory: JSON.stringify(process.memoryUsage()),
      path: process.execPath,
      pid: process.pid,
      dir: process.cwd(),
    };

    logger.log("info", `RUTA: api/env${req.path}, METODO: ${req.method}`);

    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetProyectInfo,
};

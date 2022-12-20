const logger = require('../../services/logger.service');
const { arg } = require('../../config');

const GetProyectInfo = async (ctx, next) => {
  try {
    logger.log(
      'info',
      `RUTA: ${ctx.request.url}, METODO: ${ctx.request.method}`
    );

    let info = {
      args: JSON.stringify(arg),
      platform: process.platform,
      version: process.version,
      memory: JSON.stringify(process.memoryUsage()),
      path: process.execPath,
      pid: process.pid,
      dir: process.cwd(),
    };

    ctx.body = info;
  } catch (error) {
    logger.error(error);
    ctx.body = { error: 'Algo salió mal, por favor, intente nuevamente' };
  }
};

module.exports = {
  GetProyectInfo,
};

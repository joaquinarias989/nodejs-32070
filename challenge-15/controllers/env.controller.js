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

    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetProyectInfo,
};

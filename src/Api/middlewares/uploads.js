const ServiceResponse = require('../../Models/ServiceResponse');

module.exports = (req, res, next) => {
  let resp = new ServiceResponse();
  try {
    if (!req.file) {
      resp.success = false;
      resp.status = 400;
      resp.message = 'Debes subir una imágen.';
      return res.status(resp.status).json(resp);
    }
    next();
  } catch (error) {
    resp.data = error;
    throw resp;
  }
};

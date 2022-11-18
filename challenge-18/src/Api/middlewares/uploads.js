const ServiceResponse = require('../../Models/ServiceResponse');

module.exports = (req, res, next) => {
  let resp = new ServiceResponse();

  try {
    if (!req.file) {
      resp.success = false;
      resp.message = 'Debes subir una imágen.';
      return res.status(404).json(resp);
    }
    next();
  } catch (error) {
    next(error);
  }
};

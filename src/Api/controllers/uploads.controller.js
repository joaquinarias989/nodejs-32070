const ServiceResponse = require('../../Models/ServiceResponse');
const rootDir = require('path').resolve('./');

async function UploadImage(req, res, next) {
  let resp = new ServiceResponse();

  try {
    if (!req.file) {
      resp.success = false;
      resp.status = 400;
      resp.message = 'Debes subir una imagen válida.';
      return res.status(resp.status).json(resp);
    }
    resp.data = req.file;
    resp.message = 'Imágen subida exitosamente!';
    res.status(resp.status).json(resp);
  } catch (error) {
    resp.data = error;
    resp.message = 'Error al Subir la Imágen. Por favor, intente nuevamente.';
    next(resp);
  }
}

async function UploadImages(req, res, next) {
  let resp = new ServiceResponse();

  try {
    if (!req.files) {
      resp.success = false;
      resp.status = 400;
      resp.message = 'Debes subir imágenes válidas.';
      return res.status(resp.status).json(resp);
    }

    resp.data = req.files;
    resp.message = 'Imágenes subidas exitosamente!';
    res.status(resp.status).json(resp);
  } catch (error) {
    resp.data = error;
    resp.message =
      'Error al Subir las Imágenes. Por favor, intente nuevamente.';
    next(resp);
  }
}

async function GetImage(req, res, next) {
  res.sendFile(`${rootDir}/public/uploads/${req.params.fileName}`);
}

module.exports = {
  UploadImage,
  UploadImages,
  GetImage,
};

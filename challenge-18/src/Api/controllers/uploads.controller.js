const ServiceResponse = require('../../Models/ServiceResponse');
const rootDir = require('path').resolve('./');

async function UploadImage(req, res, next) {
  let resp = new ServiceResponse();

  try {
    if (!req.file) {
      resp.success = false;
      resp.message = 'Debes subir una imagen válida.';
      return res.status(404).json(resp);
    }

    resp.data = req.file;
    resp.message = 'Imágen subida exitosamente!';
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
}

async function UploadImages(req, res, next) {
  let resp = new ServiceResponse();

  try {
    if (!req.files) {
      resp.success = false;
      resp.message = 'Debes subir imágenes válidas.';
      return res.status(404).json(resp);
    }

    resp.data = req.files;
    resp.message = 'Imágenes subidas exitosamente!';
    res.status(200).json(resp);
  } catch (error) {
    next(error);
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

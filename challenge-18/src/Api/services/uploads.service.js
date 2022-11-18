const multer = require('multer');
const path = require('path');
const rootDir = require('path').resolve('./');

const storageEngine = multer.diskStorage({
  destination: `${rootDir}/public/uploads`,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const checkFileType = (file, cb) => {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|svg/;
  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Sólo se permiten imágenes en formato: .jpeg .jpg .png .svg');
  }
};

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => checkFileType(file, cb),
});

module.exports = {
  upload,
};

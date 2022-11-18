const router = require('express').Router();
const { upload } = require('../services/uploads.service');
const {
  UploadImage,
  UploadImages,
  GetImage,
} = require('../controllers/uploads.controller');

router.post('/image', upload.single('image'), UploadImage);
router.post('/images', upload.array('images', 3), UploadImages);
router.get('/image/:fileName', GetImage);

module.exports = router;

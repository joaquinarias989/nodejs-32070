const router = require('express').Router();
const uploads = require('../middlewares/uploads');
const { upload } = require('../services/uploads.service');
const {
  Login,
  Logout,
  SignUp,
  VerifyUserAuthenticated,
  GetUserAuthenticated,
  HandleLoginSuccess,
  HandleLoginError,
  HandleSignUpSuccess,
  HandleSignUpError,
} = require('../controllers/auth.controller');

router.post('/login', Login);
router.delete('/logout', VerifyUserAuthenticated, Logout);
router.post('/signUp', upload.single('avatar'), uploads, SignUp);

router.get('/user-logued', GetUserAuthenticated);

router.post('/login/success', VerifyUserAuthenticated, HandleLoginSuccess);
router.post('/login/error', HandleLoginError);

router.post('/signUp/success', VerifyUserAuthenticated, HandleSignUpSuccess);
router.post('/signUp/error', HandleSignUpError);

module.exports = router;

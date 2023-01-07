const { config } = require('../config');

const router = require('express').Router();

router.get('/', (_, res) =>
  res.render('pages/index.ejs', { page_name: 'index' })
);
router.get('/Productos', async (_, res) =>
  res.render('pages/products.ejs', {
    page_name: 'products',
  })
);
router.get('/IniciarSesion', async (_, res) => res.render('pages/login.ejs'));
router.get('/Registrarse', async (_, res) => res.render('pages/register.ejs'));
router.get('/ConfiguracionGeneral', async (_, res) =>
  res.render('pages/config.handlebars', { config })
);

module.exports = router;

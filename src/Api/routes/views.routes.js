const router = require('express').Router();

router.get('/', (_, res) => res.render('pages/index', { page_name: 'index' }));
router.get('/Productos', async (_, res) =>
  res.render('pages/products', {
    page_name: 'products',
  })
);
router.get('/IniciarSesion', async (_, res) => res.render('pages/login'));
router.get('/Registrarse', async (_, res) => res.render('pages/register'));

module.exports = router;

const Router = require('koa-router');
const router = new Router();
const { GetProyectInfo } = require('../../controllers/koa/env.koa.controller');

router.get('/api/info', GetProyectInfo);

module.exports = router;

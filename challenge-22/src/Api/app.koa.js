const Koa = require('koa');
const { arg } = require('./config');
const cors = require('koa-cors');
const serve = require('koa-static');
const { koaBody } = require('koa-body');
const rootDir = require('path').resolve('./');
const session = require('koa-session');
// const passport = require('./middlewares/passport');
const routerEnv = require('./routes/koa/env.koa.routes');
const notFound = require('./middlewares/notFound.koa');
const handleErrors = require('./middlewares/handleErrors.koa');

const app = new Koa();

//setings
app.use(
  cors({
    origin: process.env.FRONTEND_CLIENT_URI,
    credentials: true,
  })
);

//routes & middlewares
app.use(serve(`${rootDir}/public`));
app.use(koaBody());
app.keys = [process.env.SESSION_SECRET_KEY];
app.use(session({}, app));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(routerEnv.routes());

app.use(notFound);

module.exports = { app };

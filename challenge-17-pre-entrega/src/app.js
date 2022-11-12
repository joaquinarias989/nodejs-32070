const express = require('express');
const { arg } = require('./config');
const cors = require('cors');
const rootDir = require('path').resolve('./');
const session = require('express-session');
const passport = require('./middlewares/passport');
const routerEnv = require('./routes/env.routes');
const routerAuth = require('./routes/auth.routes');
const routerProds = require('./routes/products.routes');
const routerCart = require('./routes/cart.routes');
const routerOrders = require('./routes/orders.routes');
const routerUploads = require('./routes/uploads.routes');
const notFound = require('./middlewares/notFound');
const handleErrors = require('./middlewares/handleErrors');
const sessionConfig = require('./db/config');

const app = express();

//setings
app.set('port', arg.port);
app.use(
  cors({
    origin: process.env.FRONTEND_CLIENT_URI,
    credentials: true,
  })
);

//middlewares
app.use(express.static(`${rootDir}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/env', routerEnv);
app.use('/api/uploads', routerUploads);
app.use('/api/auth', routerAuth);
app.use('/api/products', routerProds);
app.use('/api/cart', routerCart);
app.use('/api/orders', routerOrders);

app.use(notFound);
app.use(handleErrors);

module.exports = { app };

const express = require('express');
const { arg } = require('./config');
const cors = require('cors');
const session = require('express-session');
const passport = require('./middlewares/passport');
const routerAuth = require('./routes/auth.routes');
const routerProds = require('./routes/products.routes');
const routerCart = require('./routes/cart.routes');
const routerEnv = require('./routes/env.routes');
const routerOrders = require('./routes/orders.routes');
const notFound = require('./middlewares/notFound');
const handleErrors = require('./middlewares/handleErrors');
const sessionConfig = require('./db/config');

const app = express();

//setings
app.set('port', arg.port);
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

//middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', routerAuth);
app.use('/api/products', routerProds);
app.use('/api/cart', routerCart);
app.use('/api/env', routerEnv);
app.use('/api/orders', routerOrders);

app.use(notFound);
app.use(handleErrors);

module.exports = { app };

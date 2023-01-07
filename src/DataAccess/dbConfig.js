const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const { config } = require('../Api/config');
const logger = require('../Api/services/logger.service');

// DB
mongoose
  .connect(config.DB_MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('MongoDB connected!'))
  .catch((err) => logger.error(err));

// SESSIONS CONFIG
const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: config.DB_MONGO_CONNECTION_STRING,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: config.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 10,
  },
};

module.exports = sessionConfig;

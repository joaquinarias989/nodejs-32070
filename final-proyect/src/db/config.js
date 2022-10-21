const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { config } = require("../config");

// DB
mongoose
  .connect(config.mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// SESSIONS CONFIG
const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: config.mongoConnectionString,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: config.sessionSecretKey,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 10,
  },
};

module.exports = sessionConfig;

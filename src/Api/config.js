require('dotenv').config();
const parseArgs = require('minimist');

let config = {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_MONGO_ADMIN_USER: process.env.DB_MONGO_ADMIN_USER,
  DB_MONGO_ADMIN_PASSWORD: process.env.DB_MONGO_ADMIN_PASSWORD,
  DB_MONGO_CONNECTION_STRING: `mongodb+srv://${process.env.DB_MONGO_ADMIN_USER}:${process.env.DB_MONGO_ADMIN_PASSWORD}@cluster0.dyzigwz.mongodb.net/street-wear-ecommerce?retryWrites=true&w=majority`,
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
  ACCOUNT_SID: process.env.ACCOUNT_SID,
  AUTH_TOKEN: process.env.AUTH_TOKEN,
  ADMIN_PHONE_NUMBER: process.env.ADMIN_PHONE_NUMBER,
  FRONTEND_CLIENT_URI: process.env.FRONTEND_CLIENT_URI,
  HOST_MAIL: process.env.HOST_MAIL,
  PORT_MAIL: process.env.PORT_MAIL,
  MAIL_ADRESS: process.env.MAIL_ADRESS,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};

let args = process.argv.slice(2);

let options = {
  alias: { p: 'port' },
  default: { port: process.env.SERVER_PORT || 8080 },
};

let arg = parseArgs(args, options);

module.exports = { config, arg };

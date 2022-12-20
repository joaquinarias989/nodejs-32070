require('dotenv').config();
const parseArgs = require('minimist');

let config = {
  DB_MONGO_ADMIN_USER: process.env.DB_MONGO_ADMIN_USER,
  DB_MONGO_ADMIN_PASSWORD: process.env.DB_MONGO_ADMIN_PASSWORD,
  DB_MONGO_CONNECTION_STRING: `mongodb+srv://${process.env.DB_MONGO_ADMIN_USER}:${process.env.DB_MONGO_ADMIN_PASSWORD}@cluster0.dyzigwz.mongodb.net/street-wear-ecommerce?retryWrites=true&w=majority`,
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
};

let args = process.argv.slice(2);

let options = {
  alias: { p: 'port' },
  default: { port: process.env.PORT || 8080 },
};

const arg = parseArgs(args, options);

module.exports = { config, arg };

require("dotenv").config();
const parseArgs = require("minimist");

let config = {
  mongoUserCredential: process.env.DB_MONGO_ADMIN_USER,
  mongoPasswordCredential: process.env.DB_MONGO_ADMIN_PASSWORD,
  mongoConnectionString: `mongodb+srv://${process.env.DB_MONGO_ADMIN_USER}:${process.env.DB_MONGO_ADMIN_PASSWORD}@cluster0.dyzigwz.mongodb.net/street-wear-ecommerce?retryWrites=true&w=majority`,
  sessionSecretKey: process.env.SESSION_SECRET,
};

const args = process.argv.slice(2);

const options = {
  alias: { p: "port", m: "mode" },
  default: { port: 8080, mode: "FORK" },
};

arg = parseArgs(args, options);

module.exports = { config, arg };

const { config } = require("dotenv");
config();

module.exports = { port: process.env.PORT || 8080 };

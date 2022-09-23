const options = {
  client: "sqlite3",
  connection: {
    filename: "./db/SQLite3/streetwear_ecommerce.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = { options };

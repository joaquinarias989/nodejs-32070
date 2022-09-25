// const { options: mariaDBOptions } = require("./mariaDB/connection");
const { options: SQLiteOptions } = require("./SQLite3/connection");

// const knexMaria = require("knex").knex(mariaDBOptions);
const knexSQLite = require("knex").knex(SQLiteOptions);

// knexMaria.schema
//   .dropTableIfExists("product")
//   .createTable("product", (table) => {
//     table.increments("id");
//     table.string("code");
//     table.string("title");
//     table.float("price");
//     table.string("description");
//     table.string("urlImg");
//     table.integer("stock");
//     table.timestamp("timestamp");
//   })
//   .then(() => console.log("Table created succefully!"))
//   .catch((error) => {
//     console.log("Error, verify.");
//     throw error;
//   })
//   .finally(() => knexMaria.destroy());

// knexMaria.schema
//   .dropTableIfExists("cart")
//   .createTable("cart", (table) => {
//     table.increments("id");
//     table.timestamp("timestamp");
//     table.json("products");
//   })
//   .then(() => console.log("Table created succefully!"))
//   .catch((error) => {
//     console.log("Error, verify.");
//     throw error;
//   })
//   .finally(() => knexMaria.destroy());

knexSQLite.schema
  .dropTableIfExists("message")
  .createTable("message", (table) => {
    table.increments("id");
    table.string("email");
    table.string("name");
    table.string("surname");
    table.integer("age");
    table.string("nickname");
    table.string("avatar");
    table.string("message");
    table.timestamp("date");
  })
  .then(() => console.log("Table created succefully!"))
  .catch((error) => {
    console.log("Error, verify.");
    throw error;
  })
  .finally(() => knexSQLite.destroy());

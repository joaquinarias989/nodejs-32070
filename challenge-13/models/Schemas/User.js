const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, require: true, max: 20 },
  password: { type: String, require: true, max: 20 },
});

module.exports = userSchema;

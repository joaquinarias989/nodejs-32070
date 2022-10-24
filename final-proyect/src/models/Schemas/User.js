const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max: 20,
    },
    password: { type: String, required: true, max: 20 },
  },
  {
    versionKey: false,
  }
);

module.exports = UserSchema;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    authorType: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      max: 254,
      required: true,
    },
    body: {
      type: String,
      max: 254,
      required: true,
    },
    timestamp: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = MessageSchema;

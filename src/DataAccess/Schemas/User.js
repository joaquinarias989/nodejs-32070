const { mongoose } = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Campo requerido'],
      max: [50, 'Ingrese 50 caracteres como máximo'],
    },
    email: {
      type: String,
      required: [true, 'Campo requerido'],
      unique: true,
      trim: true,
      max: 254,
    },
    province: { type: String, required: true, max: 50 },
    postalCode: { type: Number, required: true, length: 5 },
    address: { type: String, required: true, max: 254 },
    phone: { type: String, required: true, max: 40 },
    password: { type: String, required: true, max: 20 },
    avatar: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = UserSchema;

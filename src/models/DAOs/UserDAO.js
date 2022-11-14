const MongoDBContainer = require('../Containers/MongoDBContainer');
const userSchema = require('../Schemas/User');
const bCrypt = require('bcrypt');
const logger = require('../../services/logger');

class UserDAO extends MongoDBContainer {
  constructor() {
    super('User', userSchema);
  }

  async registerUser(obj) {
    console.log(obj);
    try {
      const user = new this.model({
        name: obj.name,
        email: obj.email,
        province: obj.province,
        postalCode: obj.postalCode,
        address: obj.address,
        phone: obj.phone,
        avatar: obj.avatar,
        password: encryptPassword(obj.password),
      });
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      console.log(error);
      throw new Error(error.name);
    }
  }

  async verifyCredentials(obj) {
    try {
      const { email, password } = obj;
      const user = await this.model.findOne({ email });
      if (!user || !isValidPassword(user, password)) {
        console.log('Usuario y/o Contraseña incorrecta.');
        return null;
      }

      return user;
    } catch (error) {
      throw new Error(error.name);
    }
  }

  async verifyUserExists(email) {
    const existingUser = await this.model.findOne({ email: email });
    return existingUser ? true : false;
  }
}

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

const encryptPassword = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = UserDAO;

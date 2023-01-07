const MongoDBContainer = require('../Containers/MongoDBContainer');
const userSchema = require('../Schemas/User');
const bCrypt = require('bcrypt');
const logger = require('../../Api/services/logger.service');

class UserDAO extends MongoDBContainer {
  constructor() {
    super('User', userSchema);
  }

  async RegisterUser(userDTO) {
    try {
      const user = new this.model({
        ...userDTO,
        password: encryptPassword(userDTO.password),
      });
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async VerifyCredentials(obj) {
    try {
      const { email, password } = obj;
      const user = await this.model.findOne({ email });
      if (!user || !isValidPassword(user, password)) {
        logger.info('Usuario y/o Contraseña incorrecta.');
        return null;
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyUserExists(email) {
    const existingUser = await this.model.findOne({ email });
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

const MongoDBContainer = require("../Containers/MongoDBContainer");
const userSchema = require("../Schemas/User");
const bCrypt = require("bcrypt");

class UserDAO extends MongoDBContainer {
  constructor() {
    super("User", userSchema);
  }

  async registerUser(obj) {
    try {
      const user = new this.model({
        username: obj.username,
        password: encryptPassword(obj.password),
      });
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw new Error(error.name);
    }
  }

  async verifyCredentials(obj) {
    try {
      const { username, password } = obj;
      const user = await this.model.findOne({ username });
      if (!user || !isValidPassword(user, password)) {
        console.log("Usuario y/o Contraseña incorrecta.");
        return null;
      }

      return user;
    } catch (error) {
      throw new Error(error.name);
    }
  }

  async verifyUserExists(username) {
    const existingUser = await this.model.findOne({ username });
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

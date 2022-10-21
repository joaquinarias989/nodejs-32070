const MongoDBContainer = require("../../containers/MongoDBContainer");
const userSchema = require("../Schemas/User");
const bCrypt = require("bcrypt");

class UserDAOMongoDB extends MongoDBContainer {
  constructor() {
    super("User", userSchema);
  }

  async registerUser(obj) {
    try {
      const user = new this.model({
        username: obj.username,
        password: obj.password,
      });
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw new Error(error.name);
    }
  }

  async verifyValidCredentials(obj) {
    try {
      const { username, password } = obj;
      const isUserExists = await this.verifyUserExists(username);
      if (!isUserExists || !isValidPassword(username, password)) {
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

module.exports = UserDAOMongoDB;

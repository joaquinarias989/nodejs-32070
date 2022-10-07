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
        username: obj.code,
        password: obj.title,
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

  async getAll() {
    try {
      const users = await this.model.find({});
      return users ? users : null;
    } catch (error) {
      throw new Error(error.name);
    }
  }
}

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

module.exports = UserDAOMongoDB;

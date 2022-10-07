const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bCrypt = require("bcrypt");

const Container = require("../models/DAOs/UserDAOMongoDB");
const users = new Container();

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      let userTryLogin = await users.verifyCredentials({ username, password });
      if (userTryLogin) return done(null, userTryLogin);
      else return done(null, false);
    } catch (error) {
      throw new Error(error.name);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        let userExist = await users.verifyCredentials({ username, password });

        if (userExist) {
          console.log("El usuario ya se encuentra Registrado en el Sistema");
          return done(null, false);
        } else {
          let { username, password } = req.body;
          let user = await users.registerUser({
            username,
            password: createHash(password),
          });
          console.log("Usuario registrado exitosamente");
          return done(null, user);
        }
      } catch (error) {
        throw new Error(error.name);
      }
    }
  )
);

// helpers

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

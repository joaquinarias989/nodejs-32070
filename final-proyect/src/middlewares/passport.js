const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Container = require("../models/DAOs/UserDAOMongoDB");
const users = new Container();

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    let user = await users.verifyCredentials({
      username,
      password,
    });
    if (user) return done(null, user);
    else
      return done(null, false, {
        message: "Usuario y/o contraseña incorrecta",
      });
  })
);

passport.use(
  "signUp",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let userExist = await users.verifyUserExists(username);
      if (userExist) {
        return done(null, false, {
          message: "El usuario ya se encuentra registrado en el Sistema",
        });
      } else {
        let { username, password } = req.body;
        let user = await users.registerUser({
          username,
          password,
        });
        return done(null, user);
      }
    }
  )
);

module.exports = passport;

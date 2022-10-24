const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Container = require("../models/DAOs/UserDAO");
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
    else return done(null, false);
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
        return done(null, false);
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

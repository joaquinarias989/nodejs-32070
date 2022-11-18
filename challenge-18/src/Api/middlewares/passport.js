const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Container = require('../../Models/ServiceResponse');
const users = new Container();

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      let user = await users.verifyCredentials({
        email,
        password,
      });
      if (user) return done(null, user);
      else return done(null, false);
    }
  )
);

passport.use(
  'signUp',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      let userExist = await users.verifyUserExists(email);
      if (userExist) {
        return done(null, false);
      } else {
        let {
          name,
          email,
          province,
          postalCode,
          address,
          phone,
          password,
          avatar,
        } = req.body;
        let user = await users.registerUser({
          name,
          email,
          province,
          postalCode,
          address,
          phone,
          password,
          avatar: req.file.filename,
        });
        return done(null, user);
      }
    }
  )
);

module.exports = passport;

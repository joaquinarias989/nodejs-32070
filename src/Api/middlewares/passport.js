const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserDTO = require('../../DataAccess/DTOs/UserDTO');
const Container = require('../../DataAccess/DAOs/UserDAO');
const Users = new Container();

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
      let user = await Users.VerifyCredentials({
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
      let userExist = await Users.verifyUserExists(email);
      if (userExist) return done(null, false);
      let { name, province, postalCode, address, phone } = req.body;
      const userToSave = new UserDTO({
        name,
        email,
        province,
        postalCode,
        address,
        phone,
        password,
        avatar: req.file.filename,
      });

      console.log(userToSave);
      let userSaved = await Users.RegisterUser(userToSave);
      console.log(userSaved);

      return done(null, userSaved);
    }
  )
);

module.exports = passport;

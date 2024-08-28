// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');
const UserService = require('./user.service');

// Local Strategy for classic login
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  const user = UserService.findUserByEmail(email);
  if (!user) {
    return done(null, false, { message: 'Incorrect email.' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}));

// JWT Strategy for protected routes
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}, (jwtPayload, done) => {
  const user = UserService.findUserById(jwtPayload.id);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

// Google OAuth2 Strategy for signup
passport.use('google-signup', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/signup/callback',
}, (token, tokenSecret, profile, done) => {
  let user = UserService.findUserByEmail(profile.emails[0].value);
  if (!user) {
    UserService.createUser(profile.emails[0].value, null)//no password
  } else {
    return done(null, false, 'ALREADY_EXISTS');
  }
  return done(null, user);
}));

// Google OAuth2 Strategy for login
passport.use('google-login', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/login/callback',
}, (token, tokenSecret, profile, done) => {
  let user = UserService.findUserByEmail(profile.emails[0].value);
  if (!user) {
    return done(null, false, { message: 'No user found. Please sign up first.' });
  }
  return done(null, user);
}));

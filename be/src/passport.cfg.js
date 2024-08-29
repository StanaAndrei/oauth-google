// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ExtractJwt } = require('passport-jwt');
const UserService = require('./user.service');

// Local Strategy for classic login
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    console.log(email);
    
  const user = await UserService.findUserByEmail(email);
  console.log(user);
  
  if (!user) {
    return done(null, false, 'WRONG_EMAIL');
  }
  if (user.password !== password) {
    return done(null, false, 'WRONG_PASSWORD');
  }
  console.log(88);
  
  return done(null, user);
}));

// JWT Strategy for protected routes
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}, async (jwtPayload, done) => {
  const user = await UserService.findUserById(jwtPayload.id);
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
  callbackURL: '/api/user/google-signup/callback',
}, async (token, tokenSecret, profile, done) => {
  let user = await UserService.findUserByEmail(profile.emails[0].value);
  if (!user) {
    user = await UserService.createUser(profile.emails[0].value, null)//no password
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
  const user = UserService.findUserByEmail(profile.emails[0].value);
  if (!user) {
    return done(null, false, 'NOT_FOUND');
  }
  return done(null, user);
}));

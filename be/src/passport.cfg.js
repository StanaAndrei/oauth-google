// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ExtractJwt } = require('passport-jwt');
const UserService = require('./user.service');
const queryString = require('querystring')

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

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
    passReqToCallback: true,
    //state: true,
}, async (req, token, refreshToken, profile, done) => {
    let user = await UserService.findUserByEmail(profile.emails[0].value);
    if (!user) {
        const query = queryString.parse(req.query.state)
        user = await UserService.createUser({
            email: profile.emails[0].value,
            password: null,
            userType: query.userType ?? 0
        })//no password
    } else {
        return done(null, false, 'ALREADY_EXISTS');
    }
    return done(null, user);
}));

// Google OAuth2 Strategy for login
passport.use('google-signin', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/user/google-signin/callback',
}, async (token, refreshToken, profile, done) => {
    const user = await UserService.findUserByEmail(profile.emails[0].value);
    if (!user) {
        return done(null, false, 'NOT_FOUND');
    }
    return done(null, user);
}));

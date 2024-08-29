const { Router } = require('express');
const UserController = require('./user.controller');
const userRouter = Router()
const passport = require('passport');
const { LOGIN_DONE_REDIR } = require('./konst');
const generateJWT = require('./jwt.util');

userRouter.post('/signup', UserController.signUp)
userRouter.post('/signin', UserController.signIn)

userRouter.get('/google-signup', [], passport.authenticate('google-signup', { scope: ['profile', 'email'] }))
userRouter.get(
    '/google-signup/callback', 
    passport.authenticate('google-signup', {
        session: false,
        successRedirect: '/success',
        failureRedirect: '/fail'
    }),
    () => undefined
)

userRouter.get('/google-signin', [], passport.authenticate('google-signin', { scope: ['profile', 'email'] }))
userRouter.get(
    '/google-signin/callback', 
    passport.authenticate('google-signin', {
        session: false,
        failureRedirect: '/fail'
    }),
    UserController.googleOauthSuccess
)

userRouter.get('/me', passport.authenticate('jwt', {
    session: false
}), UserController.getMe)

module.exports = userRouter;
const { Router } = require('express');
const UserController = require('./user.controller');
const userRouter = Router()
const passport = require('passport');

userRouter.post('/signup', UserController.signUp)
userRouter.post('/signin', UserController.signIn)

userRouter.get('/google-signup', UserController.googleSignUpHandler)
userRouter.get(
    '/google-signup/callback', 
    passport.authenticate('google-signup', {
        session: true,
        failureRedirect: '/fail'
    }),
    UserController.googleOauthSuccess
)

userRouter.get('/google-signin', [], passport.authenticate('google-signin', { scope: ['profile', 'email'] }))
userRouter.get(
    '/google-signin/callback', 
    passport.authenticate('google-signin', {
        session: true,
        failureRedirect: '/fail'
    }),
    UserController.googleOauthSuccess
)

userRouter.get('/me', passport.authenticate('jwt', {
    session: true
}), UserController.getMe)

module.exports = userRouter;
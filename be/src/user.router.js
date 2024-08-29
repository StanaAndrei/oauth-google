const { Router } = require('express');
const UserController = require('./user.controller');
const userRouter = Router()
const passport = require('passport');

userRouter.post('/signup', UserController.signUp)
userRouter.post('/signin', UserController.signIn)
userRouter.get('/google-signup', passport.authenticate('google-signup', { scope: ['profile', 'email'] }))
userRouter.get(
    '/google-signup/callback', 
    passport.authenticate('google-signup', {
        session: false,
        successRedirect: '/',
        failureRedirect: '/fail'
    }),
    UserController.googleSignUpCallback
)
userRouter.get('/me', passport.authenticate('jwt', {
    session: false
}), UserController.getMe)

module.exports = userRouter;
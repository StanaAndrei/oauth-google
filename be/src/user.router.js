const { Router } = require('express');
const UserController = require('./user.controller');
const userRouter = Router()
const passport = require('passport');

userRouter.post('/signup', UserController.signUp)
userRouter.post('/signin', UserController.signIn)
userRouter.get('/google-signup', UserController.googleSignUp)
userRouter.get(
    '/google-signup', 
    passport.authenticate('google-signup', {
        session: false,
        failureRedirect: '/'
    }),
    UserController.googleSignUpCallback
)
userRouter.get('/me', passport.authenticate('jwt', {
    session: false
}), UserController.getMe)

module.exports = userRouter;
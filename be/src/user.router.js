const { Router } = require('express');
const UserController = require('./user.controller');
const userRouter = Router()
const passport = require('passport');
const querystring = require('querystring');

userRouter.post('/signup', UserController.signUp)
userRouter.post('/signin', UserController.signIn)

userRouter.get('/google-signup', (req, res, next) => {
    const state = querystring.stringify(req.query);
    console.log('====================================!!');
    console.log(req.query);
    console.log('====================================');
    passport.authenticate('google-signup', { scope: ['profile', 'email'], state })(req, res, next)
})
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
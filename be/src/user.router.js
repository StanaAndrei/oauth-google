const { Router } = require('express');
const UserController = require('./user.controller');
const userRouter = Router()
const passport = require('passport');

userRouter.post('/signup', UserController.signUp)
userRouter.post('/signin', UserController.signIn)

module.exports = userRouter;
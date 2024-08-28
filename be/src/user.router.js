const { Router } = require('express');
const UserController = require('./user.controller');
const userRouter = Router()

userRouter.post('/sign-up', UserController.signUp)
userRouter.post('/sign-in', UserController.signIn)

module.exports = userRouter;
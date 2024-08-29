const generateJWT = require('./jwt.util');
const { LOGIN_DONE_REDIR } = require('./konst');
const UserService = require('./user.service')
const passport = require('passport');

const signUp = async (req, res) => {
    const { email, password } = req.body;
    if (await UserService.findUserByEmail(email)) {
        return res.status(400).send('ALREADY_EXISTS')
    }
    await UserService.createUser(email, password)
    res.status(201).end()
}

const signIn = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).send(info ? info : 'FAIL')
        }
        res.status(200).send(generateJWT(user)) 
    })(req, res, next)
}

const getMe = async (req, res) => {    
    res.status(200).send(req.user)
}

const googleOauthSuccess = async (req, res) => {
    const token = generateJWT(req.user)
    res.redirect(`${LOGIN_DONE_REDIR}?token=${token}`)
}

const UserController = {
    signIn, signUp, 
    getMe, googleOauthSuccess
}
module.exports = UserController
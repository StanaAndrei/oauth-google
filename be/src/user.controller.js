const generateJWT = require('./jwt.util');
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
        
        console.log(req.body);
        
        console.log(info);
        
        if (err || !user) {
            return res.status(400).send(info ? info : 'FAIL')
        }
        res.status(200).send(generateJWT(user)) 
    })(req, res, next)
}

const UserController = {
    signIn, signUp
}
module.exports = UserController
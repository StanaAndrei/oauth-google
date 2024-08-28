const generateJWT = require('./jwt.util');
const UserService = require('./user.service')

const signUp = async (req, res) => {
    const { email, password } = req.body;
    if (await UserService.findUserByEmail(email)) {
        return res.status(400).send('ALREADY_EXISTS')
    }
    await UserService.createUser(email, password)
    res.status(201).end()
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserService.findUserByEmail(email)
    if (!user) {
        return res.status(400).send('WRONG_EMAIL')
    }
    if (user.password !== password) {
        return res.status(400).send('WRONG_PASSWORD')
    }
    res.status(200).send(generateJWT(user)) 
}

const UserController = {
    signIn, signUp
}
module.exports = UserController
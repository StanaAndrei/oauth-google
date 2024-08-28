const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '10h' });
};

module.exports = generateJWT
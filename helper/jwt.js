const jwt = require('jsonwebtoken');

const generateJwt = (user) => {
    const payload = { _id: user._id, name: user.name, email: user.email,
        password: user.password, role: user.role, status: user.status };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h'});
    return token;
}

module.exports = { generateJwt };
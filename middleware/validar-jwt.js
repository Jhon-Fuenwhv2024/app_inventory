const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            message: 'Access denied. No token provided.'
        });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = payload;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Access denied. Invalid token.'
        });
    }
};

module.exports = {
    validateJwt
};
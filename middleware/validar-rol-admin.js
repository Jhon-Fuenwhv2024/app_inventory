const jwt = require('jsonwebtoken');

const validateRoleAdmin = (req, res, next) => {
    if (req.payload.role != 'Admin') {
        return res.status(401).json({message: 'Error unauthorized'});

    }
    next();
};

module.exports = { 
    validateRoleAdmin
}
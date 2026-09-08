const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        const error = new Error("Not authorized to access this route");
        error.statusCode = 401;

        return next(error);
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = await User.findById(decoded.id);

        if (!req.user) {
            const error = new Error("No user found with this id")
            error.statusCode = 401
        }

        return next();
    } catch (err) {
        const error = new Error("Not authorized to access this route");
        error.statusCode = 401;

        next(error);
    }
};

module.exports = {
    protect
}
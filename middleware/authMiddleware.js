const jwt = require('jsonwebtoken');
const ErrorResponse = require('./errorHandler');
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
            return res.status(401).json({
                message: "No user found with this id"
            });
        }

        return next();
    } catch (err) {
        return res.status(401).json({
            message: "Not authorized to access this route"
        });
    }
};

module.exports = {
    protect
}
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return next(new ErrorResponse("You are not authorized to access this", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }

        req.user = user;

        next();
    } catch (error) {
        return next(new ErrorResponse("You are not authorized to access this", 401));
    }
}
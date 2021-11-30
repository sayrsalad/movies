const User = require('../models/User');
const ErrorResponse = require("../utils/errorResponse");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

exports.register = catchAsyncErrors (async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password
        });

        sendToken(user, 200, res);

    } catch (error) {
        next(error);
    }
});

exports.login = catchAsyncErrors (async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
       return next(new ErrorResponse("Please enter a valid email and password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 404));
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendToken(user, 200, res);

    } catch (error) {
        next(error);
    }
});

exports.logout = catchAsyncErrors (async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    });
});

exports.forgotpassword = (req, res, next) => {
    res.send("Forgot Password Route");
};

exports.resetpassword = (req, res, next) => {
    res.send("Reset Password Route");
};

// const sendToken = (user, statusCode, res) => {
//     const token = user.getSignedToken();
//     res.status(statusCode).json({ success: true, token });
// }
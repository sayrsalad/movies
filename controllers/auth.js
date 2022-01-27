const User = require('../models/User');
const ErrorResponse = require("../utils/errorResponse");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');
const cloudinary = require('cloudinary');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("924372861452-4fl88545df8le5tu7e6f1tlgclt2cp78.apps.googleusercontent.com");

exports.register = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'movflix/avatars',
        width: 150,
        crop: "scale"
    });

    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
            }
        });

        sendToken(user, 200, res);

    } catch (error) {
        next(error);
    }
});

exports.login = catchAsyncErrors(async (req, res, next) => {
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

        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendToken(user, 200, res);

    } catch (error) {
        next(error);
    }
});

exports.googleLogin = catchAsyncErrors(async (req, res, next) => {

    const { tokenId } = req.body;

    const response = await client.verifyIdToken({ idToken: tokenId, audience: "924372861452-4fl88545df8le5tu7e6f1tlgclt2cp78.apps.googleusercontent.com" });
    const { email_verified, name, email, picture } = response.payload;

    if (email_verified) {

        try {
            const user = await User.findOne({ email });

            if (user) {
                sendToken(user, 200, res);
            } else {

                console.log(name);
                try {
                    const username = name;
                    const password = email + process.env.JWT_SECRET;
                    const newUser = await User.create({
                        username,
                        email,
                        password,
                        avatar: {
                            public_id: username,
                            url: picture
                        }
                    });

                    sendToken(newUser, 200, res);
                } catch (error) {
                    next(error);
                }
            }
        } catch (error) {
            return next(new ErrorResponse("Something went wrong", 400));
        }

    }

});

exports.forgotpassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorResponse("User not found with this email.", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/password/reset/${resetToken}`;

    const message = `<h1>You have requested a password reset</h1>
    <p>Please make a put request to the following link:</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

    try {

        await sendEmail({
            email: user.email,
            subject: 'Movie App Password Reset',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email has been sent successfully to ${user.email}`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse(error.message, 500));
    }

});

exports.resetpassword = catchAsyncErrors(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return next(new ErrorResponse("Your reset password token is invalid or has expired.", 400));
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorResponse("Password do not match.", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }

});

exports.getCurrentUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isMatched = await user.matchPasswords(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorResponse('Old password is incorrect', 400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

});

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    });
});

// Admin Routes

// Get all users   =>   /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
});


// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user
    })
});

// Update user profile   =>   /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
});

// Delete user   =>   /api/v1/admin/user/:id
// exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//         return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
//     }

//     // Remove avatar from cloudinary
//     const image_id = user.avatar.public_id;
//     await cloudinary.v2.uploader.destroy(image_id);

//     await user.remove();

//     res.status(200).json({
//         success: true,
//     })
// });
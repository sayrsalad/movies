const express = require('express');
const router = express.Router();

const { register,
    login,
    googleLogin,
    logout,
    forgotpassword,
    resetpassword,
    getCurrentUser,
    updatePassword,
    allUsers
} = require('../controllers/auth');

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/google/login").post(googleLogin);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotpassword);

router.route("/password/reset/:token").put(resetpassword);

router.route("/me").get(isAuthenticatedUser, getCurrentUser);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);

module.exports = router;
const express = require('express');
const router = express.Router();

const { register,
    login,
    logout,
    forgotpassword,
    resetpassword,
    getCurrentUser,
    updatePassword
} = require('../controllers/auth');

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotpassword);

router.route("/password/reset/:token").put(resetpassword);

router.route("/me").get(isAuthenticatedUser, getCurrentUser);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

module.exports = router;
const express = require('express');
const router = express.Router();

const { register, login, logout, forgotpassword, resetpassword } = require('../controllers/auth');

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotpassword);

router.route("/password/reset/:token").put(resetpassword);

module.exports = router;
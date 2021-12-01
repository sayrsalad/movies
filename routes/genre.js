const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

const { index, add, update, find, remove } = require('../controllers/genre');

router.route('/').get(isAuthenticatedUser, index);

router.route('/add').post(isAuthenticatedUser, add);

router.route('/update/:id').post(isAuthenticatedUser, update);

router.route('/:id').get(isAuthenticatedUser, find);

router.route('/:id').delete(isAuthenticatedUser, remove);

module.exports = router;
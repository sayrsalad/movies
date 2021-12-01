const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { index, add, update, find, remove } = require('../controllers/movie');

router.route('/').get(isAuthenticatedUser, authorizeRoles('admin'), index);

router.route('/add').post(isAuthenticatedUser, upload.single('poster'), add);

router.route('/update/:id').post(isAuthenticatedUser, upload.single('poster'), update);

router.route('/:id').get(isAuthenticatedUser, find);

router.route('/:id').delete(isAuthenticatedUser, remove);

module.exports = router;
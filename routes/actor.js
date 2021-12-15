const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const { isAuthenticatedUser } = require("../middleware/auth");

const { index, add, update, find, remove, createActorReview,
        getAdminActors } = require('../controllers/actor');

router.route('/').get(index);

router.route('/add').post(isAuthenticatedUser, upload.single('profile'), add);

router.route('/update/:id').post(isAuthenticatedUser, upload.single('profile'), update);

router.route('/admin').get(getAdminActors);

router.route('/:id').get(find);

router.route('/:id').delete(isAuthenticatedUser, remove);

router.route('/review').put(isAuthenticatedUser, createActorReview);

module.exports = router;
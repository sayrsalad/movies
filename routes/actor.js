const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const { index, add, update, find, remove, createActorReview,
        getAdminActors } = require('../controllers/actor');

router.route('/actors').get(index);

router.route('/actor/add').post(isAuthenticatedUser, add);

router.route('/actor/update/:id').put(isAuthenticatedUser, authorizeRoles('admin'), update);

router.route('/admin/actors').get(isAuthenticatedUser, authorizeRoles('admin') ,getAdminActors);

router.route('/actor/:id').get(find);

router.route('/admin/actor/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), remove);

router.route('/actor/review').put(isAuthenticatedUser, createActorReview);

module.exports = router;
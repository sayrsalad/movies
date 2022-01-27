const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const { index, add, update, find, remove,
        getAdminProducers } = require('../controllers/producer');

router.route('/producers').get(index);

router.route('/producer/add').post(isAuthenticatedUser, authorizeRoles('admin'), add);

router.route('/producer/update/:id').put(isAuthenticatedUser, authorizeRoles('admin'), update);

router.route('/producer/:id').get(find);

router.route('/admin/producer/:id').delete(isAuthenticatedUser, authorizeRoles('admin') , remove);

router.route('/admin/producers').get(isAuthenticatedUser, authorizeRoles('admin') , getAdminProducers);

module.exports = router;
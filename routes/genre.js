const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth");

const { index, add, update, find, remove } = require('../controllers/genre');

router.route('/').get(protect, index);

router.route('/add').post(protect, add);

router.route('/update/:id').post(protect, update);

router.route('/:id').get(protect, find);

router.route('/:id').delete(protect, remove);

module.exports = router;
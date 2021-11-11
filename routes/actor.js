const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const { protect } = require("../middleware/auth");

const { index, add, update, find, remove } = require('../controllers/actor');

router.route('/').get(protect, index);

router.route('/add').post(protect, upload.single('profile'), add);

router.route('/update/:id').post(protect, upload.single('profile'), update);

router.route('/:id').get(protect, find);

router.route('/:id').delete(protect, remove);

module.exports = router;
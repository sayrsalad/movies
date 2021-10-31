const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

const { index, add, update, find, remove } = require('../controllers/actor');

router.route('/').get(index);

router.route('/add').post(add);

router.route('/update/:id').post(update);

router.route('/:id').get(find);

router.route('/:id').delete(remove);

module.exports = router;
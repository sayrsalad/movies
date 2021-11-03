const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

const { index, add, update, find, remove } = require('../controllers/actor');

router.route('/').get(index);

router.route('/add').post(upload.single('profile'), add);

router.route('/update/:id').post(upload.single('profile'), update);

router.route('/:id').get(find);

router.route('/:id').delete(remove);

module.exports = router;
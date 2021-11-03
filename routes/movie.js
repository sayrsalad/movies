const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

const { index, add, update, find, remove } = require('../controllers/movie');

router.route('/').get(index);

router.route('/add').post(upload.single('poster'), add);

router.route('/update/:id').post(upload.single('poster'), update);

router.route('/:id').get(find);

router.route('/:id').delete(remove);

module.exports = router;
const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const { index, add, update, find, remove, createMovieReview, getMovieReviews, deleteMovieReview,
        getAdminMovies
} = require('../controllers/movie');

// router.route('/').get(isAuthenticatedUser, authorizeRoles('admin'), index);
router.route('/').get(index);

router.route('/add').post(isAuthenticatedUser, upload.single('poster'), add);

router.route('/update/:id').post(isAuthenticatedUser, upload.single('poster'), update);

router.route('/reviews').get(isAuthenticatedUser, getMovieReviews);

router.route('/reviews').delete(isAuthenticatedUser, deleteMovieReview);

router.route('/admin').get(getAdminMovies);

router.route('/:id').get(find);

router.route('/:id').delete(isAuthenticatedUser, remove);

router.route('/review').put(isAuthenticatedUser, createMovieReview);



module.exports = router;
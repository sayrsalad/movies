const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const { index, add, update, find, remove, createMovieReview, getMovieReviews, deleteMovieReview,
        getAdminMovies
} = require('../controllers/movie');

router.route('/movies').get(index);

router.route('/movie/add').post(isAuthenticatedUser, authorizeRoles('admin'), add);

router.route('/movie/update/:id').put(isAuthenticatedUser, authorizeRoles('admin'), update);

router.route('/movie/reviews').get(isAuthenticatedUser, getMovieReviews);

router.route('/movie/reviews').delete(isAuthenticatedUser, deleteMovieReview);

router.route('/admin/movies').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminMovies);

router.route('/movie/:id').get(find);

router.route('/admin/movie/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), remove);

router.route('/movie/review').put(isAuthenticatedUser, createMovieReview);



module.exports = router;
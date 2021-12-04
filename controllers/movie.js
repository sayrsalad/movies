const Movie = require('../models/Movie');

const ErrorResponse = require('../utils/errorResponse');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

exports.index = catchAsyncErrors(async (req, res, next) => {
    try {
        
        const resPerPage = 5;
        const moviesCount = await Movie.countDocuments();

        const apiFeatures = new APIFeatures(Movie.find(), req.query)
            .search()
            .filter();

        const movies = await apiFeatures.query;
        res.status(200).json({
            success: true,
            moviesCount,
            movies
        });
    } catch (error) {
        next(error);
    }
});

exports.add = catchAsyncErrors(async (req, res, next) => {
    try {

        req.body.user = req.user.id;

        const movie = new Movie(req.body);

        movie.poster = req.file.filename;

        movie.save();

        res.status(200).json({
            status: "Record Added",
            success: true,
            movie
        });
    } catch (error) {
        next(error);
    }
});

exports.update = catchAsyncErrors(async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        movie.poster = req.file.filename;

        movie.save();

        res.status(200).json({
            success: true,
            movie
        });
    } catch (error) {
        next(new ErrorResponse('Movie not found', 404));
    }
});

exports.find = catchAsyncErrors(async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        res.status(200).json({
            success: true,
            movie
        });
    } catch (error) {
        next(new ErrorResponse('Movie not found', 404));
    }
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Record Deleted"
        });
    } catch (error) {
        next(error);
    }
});

exports.createMovieReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, _id } = req.body;

    const review = {
        user: req.user._id,
        username: req.user.username,
        rating: Number(rating),
        comment
    }

    const movie = await Movie.findById(_id);

    const isReviewed = movie.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        movie.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        });

    } else {
        movie.reviews.push(review);
        movie.numOfReviews = movie.reviews.length;
    }

    movie.ratings = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;

    await movie.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

});

exports.getMovieReviews = catchAsyncErrors(async (req, res, next) => {
    const movie = await Movie.findById(req.query.id);

    console.log(req.query.id);

    res.status(200).json({
        success: true,
        reviews: movie.reviews
    })
});

exports.deleteMovieReview = catchAsyncErrors(async (req, res, next) => {

    const movie = await Movie.findById(req.query.movie_id);

    const reviews = movie.reviews.filter(review => review.user.toString() !== req.query._id.toString());

    const numOfReviews = reviews.length;

    const ratings = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Movie.findByIdAndUpdate(req.query.movie_id, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
});
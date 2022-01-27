const Movie = require('../models/Movie');

const ErrorResponse = require('../utils/errorResponse');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

const cloudinary = require('cloudinary');

exports.index = catchAsyncErrors(async (req, res, next) => {
    try {

        const resPerPage = 6;
        const moviesCount = await Movie.countDocuments();

        const apiFeatures = new APIFeatures(Movie.find(), req.query)
            .search()
            .filter()
            .pagination(resPerPage);

        const movies = await apiFeatures.query;

        const filteredMoviesCount = movies.length;

        res.status(200).json({
            success: true,
            moviesCount,
            resPerPage,
            filteredMoviesCount,
            movies
        });
    } catch (error) {
        next(error);
    }
});

exports.add = catchAsyncErrors(async (req, res, next) => {
    try {

        req.body.user = req.user.id;

        const posterRes = await cloudinary.v2.uploader.upload(req.body.poster, {
            folder: 'movflix/posters',
            width: 150,
            crop: "scale"
        });

        let poster = {
            public_id: posterRes.public_id,
            url: posterRes.secure_url
        }

        let images = [];
        if (typeof req.body.images === 'string') {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'movflix/posters'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks;
        req.body.poster = poster;

        const movie = await Movie.create(req.body);

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
        let movie = await Movie.findById(req.params.id);

        let images = [];
        if (typeof req.body.images === 'string') {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        if (images !== undefined) {

            const result = await cloudinary.v2.uploader.destroy(movie.poster.public_id);

            for (let i = 0; i < movie.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(movie.images[i].public_id);
            }

            const posterRes = await cloudinary.v2.uploader.upload(req.body.poster, {
                folder: 'movflix/posters',
                width: 150,
                crop: "scale"
            });
    
            let poster = {
                public_id: posterRes.public_id,
                url: posterRes.secure_url
            }

            let imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: 'movflix/posters'
                });
    
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }
    
            req.body.images = imagesLinks;
            req.body.poster = poster;
        }

        movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

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
        const movie = await Movie.findById(req.params.id).populate('actors');

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

exports.getAdminMovies = catchAsyncErrors(async (req, res, next) => {

    const movies = await Movie.find();

    res.status(200).json({
        success: true,
        movies
    })

});
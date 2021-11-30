const Movie = require('../models/Movie');

const ErrorResponse = require('../utils/errorResponse');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

exports.index = catchAsyncErrors(async (req, res, next) => {
    try {

        const resPerPage = 5;
        const movieCount = await Movie.countDocuments();

        const apiFeatures = new APIFeatures(Movie.find(), req.query)
            .search()
            .filter()
            .pagination(resPerPage);
        
        const movie = await apiFeatures.query;
        res.status(200).json({
            success: true,
            count: movie.length,
            movieCount,
            movie
        });
    } catch (error) {
        next(error);
    }
});

exports.add = catchAsyncErrors(async (req, res, next) => {
    try {
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
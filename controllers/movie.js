const Movie = require('../models/movie.model');

exports.index = async (req, res, next) => {
    try {
        const movie = await Movie.find();
        res.status(200).json({
            success: true,
            movie
        });
    } catch (error) {
        next(error);
    }
};

exports.add = async (req, res, next) => {
    try {
        console.log(req.body);

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
};

exports.update = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        movie.title = req.body.title;
        movie.story = req.body.story;
        movie.releaseDate = req.body.releaseDate;
        movie.duration = req.body.duration;

        movie.save();

        res.status(200).json({
            success: true,
            movie
        });
    } catch (error) {
        next(error);
    }
};

exports.find = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        res.status(200).json({
            success: true,
            movie
        });
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Record Deleted"
        });
    } catch (error) {
        next(error);
    }
};
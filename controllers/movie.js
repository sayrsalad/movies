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
    res.send("Add Movies");
};

exports.update = async (req, res, next) => {
    res.send("Update Movies");
};

exports.find = async (req, res, next) => {
    res.send("Find Movies");
};

exports.remove = async (req, res, next) => {
    res.send("Remove Movies");
};
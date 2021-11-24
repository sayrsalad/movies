const Genre = require('../models/Genre');

exports.index = async (req, res, next) => {
    try {
        const genre = await Genre.find();
        res.status(200).json({
            success: true,
            genre
        });
    } catch (error) {
        next(error);
    }
}

exports.add = async (req, res, next) => {
    try {
        const genre = new Genre(req.body);

        genre.save();

        res.status(200).json({
            status: "Record Added",
            success: true,
            genre
        });
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const genre = await Genre.findById(req.params.id);

        genre.name = req.body.name;

        genre.save();

        res.status(200).json({
            success: true,
            genre
        });
    } catch (error) {
        next(error);
    }
}

exports.find = async (req, res, next) => {
    try {
        const genre = await Genre.findById(req.params.id);

        res.status(200).json({
            success: true,
            genre
        });
    } catch (error) {
        next(error);
    }
}

exports.remove = async (req, res, next) => {
    try {
        await Genre.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Record Deleted"
        });
    } catch (error) {
        next(error);
    }
}
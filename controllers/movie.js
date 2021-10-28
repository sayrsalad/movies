const Movie = require('../models/movie.model');

exports.index = (req, res, next) => {
    Movie.find()
        .then(movie => res.json(movie))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.add = (req, res, next) => {
    res.send("Add Movies");
}

exports.update = (req, res, next) => {
    res.send("Update Movies");
}

exports.find = (req, res, next) => {
    res.send("Find Movies");
}

exports.remove = (req, res, next) => {
    res.send("Remove Movies");
}
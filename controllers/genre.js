const Genre = require('../models/genre.model');

exports.index = async (req, res, next) => {
    res.send("Genres");
}

exports.add = async (req, res, next) => {
    res.send("Add Genres");
}

exports.update = async (req, res, next) => {
    res.send("Update Genres");
}

exports.find = async (req, res, next) => {
    res.send("Find Genres");
}

exports.remove = async (req, res, next) => {
    res.send("Remove Genres");
}
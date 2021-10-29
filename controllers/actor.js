const Actor = require('../models/actor.model');

exports.index = async (req, res, next) => {
    try {
        const actor = await Actor.find();
        res.status(200).json({
            success: true,
            actor
        });
    } catch (error) {
        next(error);
    }
}

exports.add = async (req, res, next) => {
    res.send("Add Actors");
}

exports.update = async (req, res, next) => {
    res.send("Update Actors");
}

exports.find = async (req, res, next) => {
    res.send("Find Actors");
}

exports.remove = async (req, res, next) => {
    res.send("Remove Actors");
}
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
    try {
        const actor = new Actor(req.body);

        actor.save();

        res.status(200).json({
            status: "Record Added",
            success: true,
            actor
        });
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const actor = await Actor.findById(req.params.id);

        actor.firstname = req.body.firstname;
        actor.lastname = req.body.lastname;
        actor.email = req.body.email;

        actor.save();

        res.status(200).json({
            success: true,
            actor
        });
    } catch (error) {
        next(error);
    }
}

exports.find = async (req, res, next) => {
    try {
        const actor = await Actor.findById(req.params.id);

        res.status(200).json({
            success: true,
            actor
        });
    } catch (error) {
        next(error);
    }
}

exports.remove = async (req, res, next) => {
    try {
        await Actor.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Record Deleted"
        });
    } catch (error) {
        next(error);
    }
}
const Producer = require('../models/producer.model');

exports.index = async (req, res, next) => {
    try {
        const producer = await Producer.find();
        res.status(200).json({
            success: true,
            producer
        });
    } catch (error) {
        next(error);
    }
}

exports.add = async (req, res, next) => {
    res.send("Add Producers");
}

exports.update = async (req, res, next) => {
    res.send("Update Producers");
}

exports.find = async (req, res, next) => {
    res.send("Find Producers");
}

exports.remove = async (req, res, next) => {
    res.send("Remove Producers");
}
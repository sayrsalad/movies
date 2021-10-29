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
    try {
        const producer = new Producer(req.body);

        producer.save();

        res.status(200).json({
            status: "Record Added",
            success: true,
            producer
        });
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const producer = await Producer.findById(req.params.id);

        producer.name = req.body.name;
        producer.email = req.body.email;
        producer.website = req.body.website;

        producer.save();

        res.status(200).json({
            success: true,
            producer
        });
    } catch (error) {
        next(error);
    }
}

exports.find = async (req, res, next) => {
    try {
        const producer = await Producer.findById(req.params.id);

        res.status(200).json({
            success: true,
            producer
        });
    } catch (error) {
        next(error);
    }
}

exports.remove = async (req, res, next) => {
    try {
        await Producer.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Record Deleted"
        });
    } catch (error) {
        next(error);
    }
}
const Actor = require('../models/Actor');

const ErrorResponse = require('../utils/errorResponse');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.index = catchAsyncErrors(async (req, res, next) => {
    try {
        const actor = await Actor.find();
        res.status(200).json({
            success: true,
            actor
        });
    } catch (error) {
        next(error);
    }
});

exports.add = catchAsyncErrors(async (req, res, next) => {
    try {
        const actor = new Actor(req.body);

        actor.profile = req.file.filename;

        actor.save();

        res.status(200).json({
            status: "Record Added",
            success: true,
            actor
        });
    } catch (error) {
        next(error);
    }
});

exports.update = catchAsyncErrors(async (req, res, next) => {
    try {
        const actor = await Actor.findById(req.params.id);

        actor.profile = req.file.filename;
        actor.firstname = req.body.firstname;
        actor.lastname = req.body.lastname;
        actor.email = req.body.email;

        actor.save();

        res.status(200).json({
            success: true,
            actor
        });
    } catch (error) {
        next(new ErrorResponse('Actor not found', 404));
    }
});

exports.find = catchAsyncErrors(async (req, res, next) => {
    try {
        const actor = await Actor.findById(req.params.id);

        res.status(200).json({
            success: true,
            actor
        });
    } catch (error) {
        next(new ErrorResponse('Actor not found', 404));
    }
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
    try {
        await Actor.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Record Deleted"
        });
    } catch (error) {
        next(error);
    }
});
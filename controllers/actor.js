const Actor = require('../models/Actor');

const ErrorResponse = require('../utils/errorResponse');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

exports.index = catchAsyncErrors(async (req, res, next) => {
    try {

        const resPerPage = 6;
        const actorsCount = await Actor.countDocuments();

        const apiFeatures = new APIFeatures(Actor.find(), req.query)
            .search()
            .filter()
            .pagination(resPerPage);

        const actors = await apiFeatures.query;
        res.status(200).json({
            success: true,
            actorsCount,
            resPerPage,
            actors
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

exports.createActorReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, _id } = req.body;
    
    const review = {
        user: req.user._id,
        username: req.user.username,
        rating: Number(rating),
        comment
    }

    const actor = await Actor.findById(_id);

    const isReviewed = actor.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        actor.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        });

    } else {
        actor.reviews.push(review);
        actor.numOfReviews = actor.reviews.length;
    }

    actor.ratings = actor.reviews.reduce((acc, item) => item.rating + acc, 0) / actor.reviews.length;

    await actor.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

});

exports.getAdminActors = catchAsyncErrors(async (req, res, next) => {

    const actors = await Actor.find();

    res.status(200).json({
        success: true,
        actors
    })

});
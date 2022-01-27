const Producer = require('../models/Producer');

const ErrorResponse = require('../utils/errorResponse');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

const cloudinary = require('cloudinary');

exports.index = catchAsyncErrors(async (req, res, next) => {
    try {

        const resPerPage = 4;
        const producersCount = await Producer.countDocuments();

        const apiFeatures = new APIFeatures(Producer.find(), req.query)
            .search()
            .filter()
            .pagination(resPerPage);

        const producers = await apiFeatures.query;

        const filteredProducersCount = producers.length;

        res.status(200).json({
            success: true,
            producersCount,
            resPerPage,
            filteredProducersCount,
            producers
        });
    } catch (error) {
        next(error);
    }
});

exports.add = catchAsyncErrors(async (req, res, next) => {
    try {
        
        const profileRes = await cloudinary.v2.uploader.upload(req.body.profile, {
            folder: 'movflix/profiles',
            width: 150,
            crop: "scale"
        });
        
        let profile = {
            public_id: profileRes.public_id,
            url: profileRes.secure_url
        }

        let images = [];
        if (typeof req.body.images === 'string') {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }
       
        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'movflix/profiles'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks;
        req.body.profile = profile;

        const producer = await Producer.create(req.body);

        res.status(200).json({
            status: "Record Added",
            success: true,
            producer
        });
    } catch (error) {
        next(error);
    }
});

exports.update = catchAsyncErrors(async (req, res, next) => {
    try {
        
        let producer = await Producer.findById(req.params.id);
        
        let images = [];
        if (typeof req.body.images === 'string') {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }
        
        if (images !== undefined) {

            const result = await cloudinary.v2.uploader.destroy(producer.profile.public_id);

            for (let i = 0; i < producer.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(producer.images[i].public_id);
            }

            const profileRes = await cloudinary.v2.uploader.upload(req.body.profile, {
                folder: 'movflix/profiles',
                width: 150,
                crop: "scale"
            });

            let profile = {
                public_id: profileRes.public_id,
                url: profileRes.secure_url
            }

            let imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: 'movflix/profiles'
                });
    
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }
    
            req.body.images = imagesLinks;
            req.body.profile = profile;
        }

        producer = await Producer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            producer
        });
    } catch (error) {
        next(new ErrorResponse('Producer not found', 404));
    }
})

exports.find = catchAsyncErrors(async (req, res, next) => {
    try {
        const producer = await Producer.findById(req.params.id).populate('movies');

        res.status(200).json({
            success: true,
            producer
        });
    } catch (error) {
        next(new ErrorResponse('Producer not found', 404));
    }
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
    try {
        await Producer.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Record Deleted"
        });
    } catch (error) {
        next(error);
    }
});

exports.getAdminProducers = catchAsyncErrors(async (req, res, next) => {

    const producers = await Producer.find();

    res.status(200).json({
        success: true,
        producers
    })

});
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actorSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter actor first name'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Please enter actor last name'],
        trim: true
    },
    biography: {
        type: String,
        required: [true, 'Please enter biography'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter actor email'],
        trim: true
    },
    profile: {
        public_id: {
            type: String,
            default: 'profiles/1636619587424empty_profile_pjbw6i'
        },
        url: {
            type: String,
            default: 'https://res.cloudinary.com/djqpxmv5o/image/upload/v1639001436/movflix/profiles/1636619587424empty_profile_pjbw6i.png'
        }
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            username: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    movies: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'movie',
            required: true
        }
    ]
}, {
    timestamps: true
});

const Actor = mongoose.model('actor', actorSchema);

module.exports = Actor;

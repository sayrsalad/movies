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
    email: {
        type: String,
        required: [true, 'Please enter actor email'],
        trim: true
    },
    profile: {
        type: String,
        required: [true, 'Please enter valid profile picture'],
        trim: true,
        default: "1636619587424empty_profile.png"
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
    movies: [
        {
            movie_id: {
                type: mongoose.Schema.ObjectId,
                ref: 'Movie',
                required: true
            },
            movie_name: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const Actor = mongoose.model('actor', actorSchema);

module.exports = Actor;

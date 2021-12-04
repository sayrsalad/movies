const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const producerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter producer name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter producer email'],
        trim: true
    },
    website: {
        type: String,
        required: [true, 'Please enter producer website'],
        trim: true
    },
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
    ],
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
    ]
}, {
    timestamps: true
});

const Producer = mongoose.model('producer', producerSchema);

module.exports = Producer;

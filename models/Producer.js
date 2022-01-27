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
            type: mongoose.Schema.ObjectId,
            ref: 'movie',
            required: true
        }
    ],
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
    ]
}, {
    timestamps: true
});

const Producer = mongoose.model('producer', producerSchema);

module.exports = Producer;

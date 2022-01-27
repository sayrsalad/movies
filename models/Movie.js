const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter movie title'],
        trim: true
    },
    releaseDate: {
        type: Date,
        required: [true, 'Please enter movie release date'],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Please enter movie duration'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Please select a genre for this movie'],
        enum: {
            values: [
                "Action",
                "Adventure",
                "Animated",
                "Biography",
                "Comedy",
                "Crime",
                "Dance",
                "Disaster",
                "Documentary",
                "Drama",
                "Erotic",
                "Family",
                "Fantasy",
                "Found Footage",
                "Historical",
                "Horror",
                "Independent",
                "Legal",
                "Live Action",
                "Martial Arts",
                "Musical",
                "Mystery",
                "Noir",
                "Performance",
                "Political",
                "Romance",
                "Satire",
                "Science Fiction",
                "Short",
                "Silent",
                "Slasher",
                "Sports",
                "Spy",
                "Superhero",
                "Supernatural",
                "Suspense",
                "Teen",
                "Thriller",
                "War",
                "Western"
            ],
            message: 'Please select a genre for this movie'
        }
    },
    producers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'producer',
            required: true
        }
    ],
    actors: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'actor',
            required: true
        }
    ],
    story: {
        type: String,
        required: [true, 'Please enter movie story'],
        trim: true
    },
    poster: {
        public_id: {
            type: String,
            default: 'posters/noposter_qaymbr'
        },
        url: {
            type: String,
            default: 'https://res.cloudinary.com/djqpxmv5o/image/upload/v1639001327/movflix/posters/noposter_qaymbr.jpg'
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
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;

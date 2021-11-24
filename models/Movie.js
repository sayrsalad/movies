const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter movie title'],
        trim: true
    },
    poster: {
        type: String,
        required: [true, 'Please enter valid image'],
        trim: true
    },
    story: {
        type: String,
        required: [true, 'Please enter movie story'],
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
        _id: {
            type: mongoose.Types.ObjectId,
            ref: "Genre"
        },
        name: {
            type: String,
            require: true
        }
    }
}, {
    timestamps: true
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;

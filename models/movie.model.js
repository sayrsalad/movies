const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    story: {
        type: String,
        require: true,
        trim: true
    },
    releaseDate: {
        type: Date,
        require: true,
        trim: true
    },
    duration: {
        type: Number,
        require: true,
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

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    }
}, {
    timestamps: true
});

const Genre = mongoose.model('genre', genreSchema);

module.exports = Genre;

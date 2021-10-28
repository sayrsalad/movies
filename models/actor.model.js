const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actorSchema = new Schema({
    firstname: {
        type: String,
        require: true,
        trim: true
    },
    lastname: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    }
}, {
    timestamps: true
});

const Actor = mongoose.model('actor', actorSchema);

module.exports = Actor;

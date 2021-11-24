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
    profile: {
        type: String,
        required: [true, 'Please enter actor profile'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter actor email'],
        trim: true
    }
}, {
    timestamps: true
});

const Actor = mongoose.model('actor', actorSchema);

module.exports = Actor;

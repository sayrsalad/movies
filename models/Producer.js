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
    }
}, {
    timestamps: true
});

const Producer = mongoose.model('producer', producerSchema);

module.exports = Producer;

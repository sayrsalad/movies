const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const producerSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    website: {
        type: String,
        require: true,
        trim: true
    }
}, {
    timestamps: true
});

const Producer = mongoose.model('producer', producerSchema);

module.exports = Producer;

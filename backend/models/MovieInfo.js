const mongoose = require('mongoose');

const MovieInfoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    } 
});

module.exports = mongoose.model('MovieInfo', MovieInfoSchema);
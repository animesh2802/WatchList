const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    favoriteGenres: [String],
    watchStats: {
        totalWatched: { type: Number, default: 0 },
        totalPlanned: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model("Profile", profileSchema);
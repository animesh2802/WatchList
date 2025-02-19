const mongoose = require("mongoose");

const watchedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: [String], // Allow multiple genres
    required: false,
  },
  rating: {
    type: Number, // User's personal rating (e.g., out of 5 or 10)
    min: 0,
    max: 10,
    default: null,
  },
  watchedOn: {
    type: Date,
    default: Date.now, // When the user watched it
  },
  notes: {
    type: String, // Optional user notes
    trim: true,
  },
});

module.exports = mongoose.model("Watched", watchedSchema);

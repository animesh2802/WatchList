const mongoose = require("mongoose");

const ToWatchSchema = new mongoose.Schema({
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
  priority: {
    type: String, // e.g., High, Medium, Low
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  addedOn: {
    type: Date,
    default: Date.now, // When it was added to the list
  },
  releaseDate: {
    type: Date, // If known
    required: false,
  },
  notes: {
    type: String, // Optional user notes
    trim: true,
  },
});

module.exports = mongoose.model("ToWatch", ToWatchSchema);

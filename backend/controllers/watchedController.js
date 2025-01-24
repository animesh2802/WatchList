const Watched = require("../models/watched");

// Add a watched item
const addWatched = async (req, res) => {
  const { userId, title, genre, rating, notes } = req.body;

  try {
    const watched = new Watched({ userId, title, genre, rating, notes });
    await watched.save();
    res.status(201).json({ message: "Added to watched list", watched });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all watched items
const getWatchedList = async (req, res) => {
  const { userId } = req.params;

  try {
    const watchedList = await Watched.find({ userId });
    res.status(200).json(watchedList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a watched item
const deleteWatched = async (req, res) => {
  const { id } = req.params;

  try {
    await Watched.findByIdAndDelete(id);
    res.status(200).json({ message: "Watched item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addWatched, getWatchedList, deleteWatched };

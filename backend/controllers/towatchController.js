const ToWatch = require("../models/towatch");

// Add an item to the to-watch list
const addToWatch = async (req, res) => {
  const { userId, title, genre, priority, notes } = req.body;

  try {
    const toWatch = new ToWatch({ userId, title, genre, priority, notes });
    await toWatch.save();
    res.status(201).json({ message: "Added to to-watch list", toWatch });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all items in the to-watch list
const getToWatchList = async (req, res) => {
  const { userId } = req.params;

  try {
    const toWatchList = await ToWatch.find({ userId });
    res.status(200).json(toWatchList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an item from the to-watch list
const deleteToWatch = async (req, res) => {
  const { id } = req.params;

  try {
    await ToWatch.findByIdAndDelete(id);
    res.status(200).json({ message: "To-watch item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addToWatch, getToWatchList, deleteToWatch };

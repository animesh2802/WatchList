const express = require("express");
const { addWatched, getWatchedList, deleteWatched } = require("../controllers/watchedController");
const router = express.Router();

// Add a watched item
router.post("/", addWatched);

// Get all watched items for a user
router.get("/:userId", getWatchedList);

// Delete a watched item
router.delete("/:id", deleteWatched);

module.exports = router;

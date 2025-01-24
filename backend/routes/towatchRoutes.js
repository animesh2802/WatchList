const express = require("express");
const { addToWatch, getToWatchList, deleteToWatch } = require("../controllers/towatchController");
const router = express.Router();

// Add an item to the "to-watch" list
router.post("/", addToWatch);

// Get all items in the "to-watch" list for a user
router.get("/:userId", getToWatchList);

// Delete an item from the "to-watch" list
router.delete("/:id", deleteToWatch);

module.exports = router;

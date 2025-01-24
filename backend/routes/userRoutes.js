const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Log in a user
router.post("/login", loginUser);

// Get user profile
router.get("/profile/:id", getUserProfile);

module.exports = router;

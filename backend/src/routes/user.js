const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

// ✅ GET Logged-in User Profile (Fix for /me route)
router.get("/me", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ GET Any User Profile by ID (Authenticated)
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ UPDATE User Profile (Self-Update Only)
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { name, bio, profilePicture } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, bio, profilePicture },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ GET All Users (Admin Only)
router.get("/", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

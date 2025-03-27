const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user, // Data from the decoded token
  });
});

module.exports = router;

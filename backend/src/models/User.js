const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String }, // Optional: Store user's profile picture
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;

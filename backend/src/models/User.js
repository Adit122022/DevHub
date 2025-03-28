const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed Password
  name: { type: String },
  bio: { type: String },
  profilePicture: { type: String }, // URL of profile pic
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Role-Based Access
});

module.exports = mongoose.model("User", UserSchema);

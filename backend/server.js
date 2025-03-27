require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport"); // ✅ Import passport

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Import Passport configuration **before** routes
require("./src/config/passport");

// Use express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // A secret key for signing the session ID
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in production if using HTTPS
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session()); // Enables persistent login sessions

// Routes
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Failed", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

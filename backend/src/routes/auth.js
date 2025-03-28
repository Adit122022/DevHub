const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  const token = req.user.token;
  res.redirect(`http://localhost:5173/login?token=${token}`); // Send JWT to frontend
});


module.exports = router;

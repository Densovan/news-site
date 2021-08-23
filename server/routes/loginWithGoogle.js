const router = require("express").Router();
const passport = require("passport");

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3008");
  }
);

module.exports = router;

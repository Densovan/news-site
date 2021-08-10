// const express = require("express");
// const passport = require("passport");
// // const { isUserAuthenticated } = require("../middlewares/auth");

// const router = express.Router();

// const successLoginUrl = "http://localhost:3008";
// const errorLoginUrl = "http://localhost:3008/login/error";

// router.get(
//   "/login/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureMessage: "Cannot login to Google, please try again later!",
//     failureRedirect: errorLoginUrl,
//     successRedirect: successLoginUrl,
//   }),
//   (req, res) => {
//     console.log("User: ", req.user);
//     res.send("Thank you for signing in!");
//   }
// );

// module.exports = router;

const router = require("express").Router();
const passport = require("passport");

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/getuser",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3008");
  }
);

module.exports = router;

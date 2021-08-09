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

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    // res.send(req.user);
    res.redirect("/profile");
  }
);

module.exports = router;

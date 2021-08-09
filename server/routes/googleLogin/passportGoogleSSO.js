const passport = require("passport");
const express = require("express");
// const { isUserAuthenticated } = require("../middlewares/auth");
const router = express.Router();
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/userTest");
const GOOGLE_CALLBACK_URL = "http://localhost:3500/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "7677977246216-mfg0skuque596b1o2ikturiq0n6jbp60.apps.googleusercontent.com",
      clientSecret: "zH3p3Gfs0b3R9UjcXlAjl9aU",
      callbackURL: "http://localhost:3500/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      // const defaultUser = {
      // fullname: `${profile.name.givenName} ${profile.name.familyName}`,
      // email: profile.emails[0].value,
      // image: profile.photos[0].value,
      // googleId: profile.id,
      // };

      // const user = await User.findOrCreate({
      //   where: { googleId: profile.id },
      //   defaults: defaultUser,
      // }).catch((err) => {
      //   console.log("Error signing up", err);
      //   cb(err, null);
      // });

      // if (user && user[0]) return cb(null, user && user[0]);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id } }).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  console.log("DeSerialized user", user);

  if (user) cb(null, user);
});

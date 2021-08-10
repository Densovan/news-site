const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/userTest");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     successRedirect: "http://localhost:3008",
//   }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("http://localhost:3008");
//   }
// );

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "677977246216-mfg0skuque596b1o2ikturiq0n6jbp60.apps.googleusercontent.com",
      clientSecret: "zH3p3Gfs0b3R9UjcXlAjl9aU",
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          console.log("user is: ", currentUser._id);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            fullname: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("created new user: ", currentUser._id);
              done(null, newUser);
            });
        }
      });
    }
  )
);

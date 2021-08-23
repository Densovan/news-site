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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          // console.log("user is: ", currentUser._id);
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
              // console.log("created new user: ", currentUser._id);
              done(null, newUser);
            });
        }
      });
    }
  )
);

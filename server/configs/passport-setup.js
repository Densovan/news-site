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
      // options for google strategy
      clientID:
        "677977246216-mfg0skuque596b1o2ikturiq0n6jbp60.apps.googleusercontent.com",
      clientSecret: "zH3p3Gfs0b3R9UjcXlAjl9aU",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          console.log("user is: ", currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            googleId: profile.id,
            fullname: profile.displayName,
            image: profile._json.image.url,
            email: profile.email,
          })
            .save()
            .then((newUser) => {
              console.log("created new user: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

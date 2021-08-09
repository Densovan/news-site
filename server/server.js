require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./configs/db");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const clientSchema = require("./graphql/schema");
const adminSchema = require("./graphql/adminSchema");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/userTest");
const passportSetup = require("./configs/passport-setup");
const { JWTSECRET, REFRESH_TOKEN_SECRET } = process.env;

const createAccessToken = (id) => {
  return jwt.sign({ id }, JWTSECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
const refreshMaxAge = 7 * 24 * 60 * 60;
const accessMaxAge = 20;

// const api = require("./routes/index");

// require("./auth/passport");
// require("./passport-setup");
// require("./models/user");
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//==============MiddleWare============
app.use(express.json({ extend: false }));

app.use(
  cors({
    origin: [
      "http://localhost:3008",
      "http://localhost:3000",
      // "http://localhost:3500",
      "https://beecolony.org",
      "https://backend.beecolony.org",
    ],
    credentials: true,
  })
);
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //a week
    keys: [process.env.COOKIE_SESSION],
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

app.use(cookieParser());

//==========Route==============

app.use("/auth", require("./routes/userRouter"));
app.use("/", require("./routes/uploadFile"));
app.use("/auth", require("./routes/loginWithGoogle"));
app.use("/public/", express.static(path.join(__dirname, "public")));

//==========login with google==============
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:3008",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3008");
  }
);

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
              const token = createAccessToken(currentUser._id);
              const refreshToken = createRefreshToken(currentUser._id);

              res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: accessMaxAge * 1000,
              });

              //================send the token============
              res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: refreshMaxAge * 1000,
              });

              res
                .status(200)
                .json({
                  msg: "Login Successful",
                  token: token,
                  success: true,
                  _id: currentUser._id,
                })
                .send();

              console.log("created new user: ", currentUser._id);
              done(null, newUser);
            });
        }
      });
    }
  )
);

//===========client API================
app.use(
  "/api",
  //   Auth,
  graphqlHTTP(async (req) => {
    const token = req.cookies.token;
    // console.log("token", token);
    const user = jwt.decode(token, process.env.JWTSECRET);
    return {
      context: user,
      graphiql: true,
      schema: clientSchema,
    };
  })
);

//===========admin API================
app.use(
  "/admin",
  //   Auth,
  graphqlHTTP(async (req) => {
    const token = req.cookies.token;
    // console.log("token", token);
    const user = jwt.decode(token, process.env.JWTSECRET);
    return {
      context: user,
      graphiql: true,
      schema: adminSchema,
    };
  })
);

app.get("/test", (req, res) => {
  res.send("hello world i love you");
});

//==========logoout=========
app.get("/getuser", (req, res) => {
  res.send(req.user);
});

app.get("/auth/logouts", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
});

connectDB();

const PORT = process.env.PORT || 3500;
app.listen(PORT, console.log(`Server Running on Port ${PORT}`.cyan.bold));

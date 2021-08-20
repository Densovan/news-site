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
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/userTest");
// const passportSetup = require("./configs/passport-setup");
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
app.use("/", require("./routes/loginWithGoogle"));
app.use("/public/", express.static(path.join(__dirname, "public")));

//==========login with google==============
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
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

connectDB();

const PORT = process.env.PORT || 3500;
app.listen(PORT, console.log(`Server Running on Port ${PORT}`.cyan.bold));

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
const { PubSub } = require("graphql-subscriptions");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/userTest");
// const passportSetup = require("./configs/passport-setup");
const { addPath } = require("graphql/jsutils/Path");
const { JWTSECRET, REFRESH_TOKEN_SECRET } = process.env;

//===============Subscription==================

// const ws = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { execute, subscribe } = require("graphql");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");

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
    name: "helloworld",
    maxAge: 24 * 60 * 60 * 1000, //a week
    keys: [process.env.COOKIE_SESSION],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

//==========Route==============

app.use("/auth", require("./routes/userRouter"));
app.use("/", require("./routes/uploadFile"));
app.use("/", require("./routes/loginWithGoogle"));
app.use("/public/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/loginWithGoogle"));

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
  graphqlHTTP(async (req, res) => {
    // const token = req.cookies.token;
    // const user = jwt.decode(token, process.env.JWTSECRET);
    const authorization = req.headers["x-access-token"].split(" ");
    const access_token = authorization[1];
    const user = jwt.decode(access_token, process.env.PRIVATE_KEY);
    // console.log(user, "hello");
    return {
      context: user,
      // graphiql: true,
      graphiql: {
        headerEditorEnabled: true,
      },
      schema: clientSchema,
    };
  })
);

//===========admin API================z
app.use(
  "/admin",
  //   Auth,
  graphqlHTTP(async (req) => {
    const token = req.cookies.token;
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

// const PORT = process.env.PORt || 3500;

// app.use(
//   "/api",
//   //   Auth,
//   graphqlHTTP(async (req, res) => {
//     const token = req.cookies.token;
//     // console.log("token", token);
//     const user = jwt.decode(token, process.env.JWTSECRET);
//     return {
//       context: user,
//       // graphiql: true,
//       // graphiql: {
//       //   headerEditorEnabled: true,
//       // },
//       graphiql: { subscriptionEndpoint: `ws://localhost:${PORT}/api` },
//       schema: clientSchema,
//     };
//   })
// );
// const ws = createServer(app);

// ws.listen(PORT, () => {
//   new SubscriptionServer(
//     {
//       execute,
//       subscribe,
//       schema: clientSchema,
//       onConnect: () => console.log("client connected"),
//     },
//     {
//       server: ws,
//       path: "/api",
//     }
//   );
// });

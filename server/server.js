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
const Auth = require("./middlewares/auth");
const path = require("path");

const app = express();
app.use(express.json({ extend: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3008",
      "http://localhost:3500",
      "https://beecolony.org",
      "https://backend.beecolony.org",
    ],
    credentials: true,
  })
);

connectDB();

//set up Routes
app.use("/auth", require("./routes/userRouter"));
app.use("/", require("./routes/uploadFile"));
app.use("/public/", express.static(path.join(__dirname, "public")));

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
      graphiql: false,
      schema: adminSchema,
    };
  })
);

const PORT = 3500;
app.listen(PORT, console.log(`Server Running on Port ${PORT}`.cyan.bold));

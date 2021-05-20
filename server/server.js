require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./configs/db");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const app = express();
app.use(express.json({ extend: false }));
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

connectDB();

//set up Routes

app.use("/auth", require("./routes/userRouter"));

const PORT = 3500;
app.listen(PORT, console.log(`Server Running on Port ${PORT}`.cyan.bold));

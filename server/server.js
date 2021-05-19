require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./configs/db");

const app = express();
app.use(express.json({ extend: false }));

connectDB();

//set up Routes

app.use("/auth", require("./routes/userRouter"));

const PORT = 3600;
app.listen(PORT, console.log(`Server Running on Port ${PORT}`.cyan.bold));

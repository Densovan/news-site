require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");

const app = express();

const PORT = 3600;
app.listen(PORT, console.log(`Server Running on Port ${PORT}`.cyan.bold));

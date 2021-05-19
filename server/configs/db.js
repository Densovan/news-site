require("dotenv").config();
const mongoose = require("mongoose");
const { MongoURI } = process.env;

const connectDB = async () => {
  const connection = await mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log(`MongoDB Connected: ${connection.connection.host}`.rainbow.bold);
};

module.exports = connectDB;

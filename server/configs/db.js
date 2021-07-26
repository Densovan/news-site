require("dotenv").config();
const mongoose = require("mongoose");
const { MongoURI } = process.env;

const connectDB = async () => {
  const connection = await mongoose
    .connect(MongoURI, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`.rainbow
          .bold
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err);
    });

  // console.log(`MongoDB Connected: ${connection.connection.host}`.rainbow.bold);
};

module.exports = connectDB;

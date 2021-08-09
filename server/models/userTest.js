const mongoose = require("mongoose");

const usertestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: false,
    },
    fullname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserTest = mongoose.model("Usertest", usertestSchema);
module.exports = UserTest;

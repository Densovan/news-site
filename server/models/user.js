const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    ban: {
      type: Boolean,
      default: false,
    },
    gender: { type: String, default: "male" },
    bio: { type: String, default: "404 bio not found" },
    image: {
      type: String,
      default: "https://salabackend.koompi.com/public/uploads/avatar.png",
    },
    follow: {
      type: String,
      default: 0,
    },
    // follower: {
    //   type: String,
    //   default: 0,
    // },
    // following: {
    //   type: String,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

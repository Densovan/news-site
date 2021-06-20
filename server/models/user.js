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
    // followed: {
    //   type: Boolean,
    //   default: false,
    // },
    following: [
      {
        email: {
          type: String,
          // required: true,
        },
        fullname: {
          type: String,
          // required: true,
        },
        followeingId: {
          type: String,
        },
        image: {
          type: String,
          default: "",
        },
      },
    ],
    follower: [
      {
        email: {
          type: String,
          // required: true,
        },
        followerId: {
          type: String,
        },
        fullname: {
          type: String,
          // required: true,
        },
        image: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

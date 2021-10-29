const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      // required: true,
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
    accountId: {
      type: String,
      require: true,
    },
    gender: { type: String, default: "male" },
    bio: { type: String, default: "404 bio not found" },
    image: {
      type: String,
      // default: "https://salabackend.koompi.com/public/uploads/avatar.png",
      default:
        "https://backend.beecolony.org/public/uploads/file-b361e38f-41f1-4f49-864b-a29717decebc.png",
    },
    // googleId: {
    //   type: String,
    //   require: true,
    // },
    // followed: {
    //   type: Boolean,
    //   default: false,
    // },
    // followings: [
    //   {
    //     followingsId: {
    //       type: String,
    //     },
    //   },
    // ],
    // followers: [
    //   {
    //     followersId: {
    //       type: String,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

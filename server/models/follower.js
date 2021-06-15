const mongoose = require("mongoose");

const FollowerSchema = new mongoose.Schema(
  {
    followerCount: {
      type: String,
      default: 0,
    },
    followerBy: {
      type: String, // foreign key ID from User
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Follower = mongoose.model("Follower", FollowerSchema);
module.exports = Follower;

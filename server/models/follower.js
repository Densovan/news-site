const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    followerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Follower = mongoose.model("Follower", followerSchema);
module.exports = Follower;

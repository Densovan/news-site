const mongoose = require("mongoose");

const FollowingSchema = new mongoose.Schema(
  {
    followingCount: {
      type: String,
      default: 0,
    },
    followingWho: {
      type: String, // foreign key ID from User
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Following = mongoose.model("Following", FollowingSchema);
module.exports = Following;

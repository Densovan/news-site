const mongoose = require("mongoose");

const FollowNotification = new mongoose.Schema(
  {
    userId: {
      type: String, // foreign key ID from User
    },
    followingId: {
      type: String, // foreign key ID from User
    },
    followerId: {
      type: String, // foreign key ID from User
    },
  },
  {
    timestamps: true,
  }
);

const FollowNoti = mongoose.model("FollowNotification", FollowNotification);
module.exports = FollowNoti;

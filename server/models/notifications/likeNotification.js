const mongoose = require("mongoose");

const likeNotification = new mongoose.Schema(
  {
    userId: {
      type: String, // foreign key ID from User
    },
    postId: {
      type: String, // foreign key ID from News
    },
    postUserId: {
      type: String, // foreign key ID from Users
    },
  },
  {
    timestamps: true,
  }
);

const LikeNoti = mongoose.model("Likenotification", likeNotification);
module.exports = LikeNoti;

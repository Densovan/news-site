const mongoose = require("mongoose");

const Notification = new mongoose.Schema(
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
    type: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Noti = mongoose.model("notificat", Notification);
module.exports = Noti;

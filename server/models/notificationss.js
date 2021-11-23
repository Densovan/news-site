const mongoose = require("mongoose");

const notificationssSchema = new mongoose.Schema(
  {
    likes: {
      userId: { type: mongoose.Types.ObjectId, ref: "User" },
      postId: { type: mongoose.Types.ObjectId, ref: "News" },
      postUserId: { type: mongoose.Types.ObjectId, ref: "User" },
      type: { type: String },
    },

    follow: {
      type: { type: String },
      followerId: { type: mongoose.Types.ObjectId, ref: "User" },
      followingId: { type: mongoose.Types.ObjectId, ref: "User" },
    },

    news: {
      followerId: { type: mongoose.Types.ObjectId, ref: "User" },
      followingId: { type: mongoose.Types.ObjectId, ref: "User" },
      postId: { type: mongoose.Types.ObjectId, ref: "News" },
      type: { type: String },
    },

    comments: {
      text: { type: String, require: true },
      type: { type: String },
      userId: { type: mongoose.Types.ObjectId, ref: "User" },
      postId: { type: mongoose.Types.ObjectId, ref: "News" },
    },

    // replies: [
    //   {
    //     text: { type: String, require: true },
    //     type: { type: String },
    //     commentId: { type: String },
    //     commenerId: { type: mongoose.Types.ObjectId, ref: "User" },
    //     replyerId: { type: mongoose.Types.ObjectId, ref: "User" },
    //     postId: { type: mongoose.Types.ObjectId, ref: "News" },
    //   },
    //   { timestamps: true },
    // ],
  },
  {
    timestamps: true,
  }
);

const Notificationss = mongoose.model("Notificationss", notificationssSchema);
module.exports = Notificationss;

const mongoose = require("mongoose");

const voteNotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    postId: {
      type: String,
    },
    ownerId:{
      type: String,
    },
    type: {
        type: String,
    },
    read: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
  },
  { timestamps: true }
);

const voteNotification = mongoose.model("VoteNotification", voteNotificationSchema);
module.exports = voteNotification
;

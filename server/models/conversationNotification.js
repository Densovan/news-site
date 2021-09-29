const mongoose = require("mongoose");

const conversationNotificationSchema = new mongoose.Schema(
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
    userId2: {
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

const conversationNotification = mongoose.model("ConversationNotification", conversationNotificationSchema);
module.exports = conversationNotification
;

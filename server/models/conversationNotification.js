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
    notifications:[{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
      read: { type: Boolean, require: true},
      hire: { type: Boolean, require: true},
      count: { type: Number, require: true}
    }],
  },
  { timestamps: true }
);

const conversationNotification = mongoose.model("ConversationNotification", conversationNotificationSchema);
module.exports = conversationNotification
;

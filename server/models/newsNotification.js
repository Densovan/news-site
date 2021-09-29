const mongoose = require("mongoose");

const newsNotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      // required: true,
    },
    postId: {
      type: String,
    },
    read: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
    type: { type: String },
  },
  { timestamps: true }
);

const newsNotification = mongoose.model("NewsNotification", newsNotificationSchema);
module.exports = newsNotification
;

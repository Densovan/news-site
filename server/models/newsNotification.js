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
    notifications: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, require: true },
        read: { type: Boolean, require: true },
        hire: { type: Boolean, require: true },
        count: { type: Number, require: true },
      },
    ],
    type: { type: String },
  },
  { timestamps: true }
);

const newsNotification = mongoose.model(
  "NewsNotification",
  newsNotificationSchema
);
module.exports = newsNotification;

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
    checkNotification: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true,
        },
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

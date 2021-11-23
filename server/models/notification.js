const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ownerId: { type: String, required: true }, // kind id of relate with userId or ownerId
    relateId: { type: String, required: true },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema(
  {
    followBy: {
      type: String, // foreign key ID from User
      default: "",
      required: true,
    },
    followTo: {
      type: String, // foreign key ID from User
      default: "",
      required: true,
    },
    follow: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Follow = mongoose.model("Follow", FollowSchema);
module.exports = Follow;

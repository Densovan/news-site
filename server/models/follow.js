const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    followerId: {
      type: String,
      required: true,
    },
    followingId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Follow = mongoose.model("Follow", followSchema);
module.exports = Follow;

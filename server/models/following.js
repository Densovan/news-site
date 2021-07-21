const mongoose = require("mongoose");

const followingSchema = new mongoose.Schema(
  {
    userId: {
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

const Following = mongoose.model("Following", followingSchema);
module.exports = Following;

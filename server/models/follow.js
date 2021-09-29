const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    createBy: {
      type: String,
      // required: true,
    },
    followBy: {
      type: String,
      // required: true,
    },
    followTo: {
      type: String,
      required: true,
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

const Follow = mongoose.model("Follow", followSchema);
module.exports = Follow;

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
    notifications:[{
      userId: { type: mongoose.Schema.Types.ObjectId, require: true },
      read: { type: Boolean, require: true},
      hide: { type: Boolean, require: true},
      count: { type: Number, require: true}
    }],
    type: { type: String },
  },
  { timestamps: true }
);

const Follow = mongoose.model("Follow", followSchema);
module.exports = Follow;

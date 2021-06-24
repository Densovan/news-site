const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;

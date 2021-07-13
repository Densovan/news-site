const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      require: true
    },
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;

const mongoose = require("mongoose");

const likeTopDownSchema = new mongoose.Schema(
  {
    like_count: {
      type: Number,
      require: true,
      default: 0,
    },
    // countDown: {
    //   type: Number,
    //   require: true,
    // },
    type: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LikeTopDown = mongoose.model("LikeTopDown", likeTopDownSchema);
module.exports = LikeTopDown;

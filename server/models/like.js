const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    // count: {
    //   type: Number,
    //   require: true
    // },
    // ownerId: {
    //   type: String,
    // },
    // postId: {
    //   type: String,
    //   required: true,
    // },
    likerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;

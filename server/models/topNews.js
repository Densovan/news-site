const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
  {
    voteCount: {
      type: Number,
      require: true,
      default: 0,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;

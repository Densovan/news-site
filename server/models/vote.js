const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
  {
    voteUp: {
      type: Number,
      require: true,
      default: 0,
    },
    voteDown: {
        type: Number,
        require: true,
        default: 0,
    },
    count:{
      type: Number,
      require: true,
      default: 0,
    },
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
    // Object: [{
    //     type: mongoose.Schema.Types.Object.userId,
    //     type: mongoose.Schema.Types.Object.type
    // }]
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;

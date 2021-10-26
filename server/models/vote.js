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
    notifications:[{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
      read: { type: Boolean, require: true},
      hide: { type: Boolean, require: true},
      count: { type: Number, require: true}
    }],
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", VoteSchema);
module.exports = Vote;

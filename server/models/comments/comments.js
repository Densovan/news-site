const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: Object,
    postId: mongoose.Types.ObjectId,
    reply: mongoose.Types.ObjectId,
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    postUserId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);

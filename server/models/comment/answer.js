const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      // required: true,
    },
    questionId: {
      type: String,
    },
    ownerId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      // required: true,
    },
    ownerId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;

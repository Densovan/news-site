const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userIdTo: {
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
    type: {
      type: String,
    },
    notifications:[{
      userId: { type: mongoose.Schema.Types.ObjectId, require: true },
      read: { type: Boolean, require: true},
      hire: { type: Boolean, require: true},
      count: { type: Number, require: true}
    }],
  },
  {
    timestamps: true,
  }
);
const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;

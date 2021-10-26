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
    type: {
      type: String,
    },
    ownerId: {
      type: String,
    },
    notifications:[{
      userId: { type: mongoose.Schema.Types.ObjectId, require: true },
      read: { type: Boolean, require: true},
      hide: { type: Boolean, require: true},
      count: { type: Number, require: true}
    }],
  },
  {
    timestamps: true,
  }
);
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;

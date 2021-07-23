const mongoose = require("mongoose");

const notiSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
    },
    like: {
      type: String,
    },
    postId: {
      type: String,
    },
    // followTo: {
    //   type: String,
    // },
    // followBy: {
    //   type: String,
    // },
    question: {
      type: String,
    },
    type: {
      type: String,
    },
    answer: {
      type: String,
    },
    questionId: { type: String },
  },
  { timestamps: true }
);

const Noti = mongoose.model("Noti", notiSchema);
module.exports = Noti;

const mongoose = require("mongoose");

const notiCheckSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      // required: true,
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
    // follow: {
    //   type: String,
    // },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    type: {
      type: String,
    },
    // followTo: {
    //   type: String,
    // },
    // followBy: {
    //   type: String,
    // },
    questionId: { type: String },
  },
  { timestamps: true }
);

const NotiCheck = mongoose.model("NotiCheck", notiCheckSchema);
module.exports = NotiCheck;

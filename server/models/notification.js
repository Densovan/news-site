const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    // postId: {
    //    type: String,
    //    required: true,
    // },
    postId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "News"
    }]
    // like: {
    //     count: {
    //         type: Number,
    //         required: true
    //     },
    //     userId: {
    //       type: String,
    //       required: true,
    //     },
    //     postId: {
    //       type: String,
    //       required: true,
    //     },
    // },
    // question: {
    //     count: {
    //         type: Number,
    //         required: true
    //     },
    //     userId: {
    //       type: String,
    //       required: true,
    //     },
    //     postId: {
    //       type: String,
    //       required: true,
    //     },
    //     question: {
    //       type: String,
    //       // required: true,
    //     },
    // },
    // answer: {
    //   count: {
    //       type: Number,
    //       required: true
    //   },
    //   userId: {
    //     type: String,
    //     required: true,
    //   },
    //   postId: {
    //     type: String,
    //     required: true,
    //   },
    //   answer: {
    //     type: String,
    //     // required: true,
    //   },
    //   questionId: {
    //     type: String,
    //   },
    // }
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

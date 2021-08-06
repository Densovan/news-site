const mongoose = require("mongoose");

const saveNewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    news_id: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    thumnail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    createBy: {
      type: String, // foreign key ID from User
      required: true,
    },
    slug: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const SaveNews = mongoose.model("SaveNews", saveNewsSchema);
module.exports = SaveNews;

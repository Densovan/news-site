const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    des: {
      type: String,
      // required: true,
    },
    thumnail: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      // required: true,
    },
    type: {
      type: String,
      // required: true,
    },
    createBy: {
      type: String, // foreign key ID from User
      // required: true,
    },
    slug: {
      type: String,
      // require: true,
      unique: true,
    },
    like_count: {
      type: Number,
    },
    liker_id: {
      type: String,
    },
    like_type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;

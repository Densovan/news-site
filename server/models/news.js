const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
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
    // like_count: {
    //   type: Number,
    //   require: true,
    //   default: 0,
    // },
    voteCount: {
      type: Number,
      require: true,
      default: 0,
    },
    voteUp: {
      type: Number,
      require: true,
      default: 0,
    },
    voteDown: {
      type: Number,
      require: true,
      default: 0,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    likers: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    // liker_id: {
    //   type: String,
    // },
    // count_like: {
    //   type: Number,
    // },
    // dislikers: [
    //   {
    //     user: { type: Schema.Types.ObjectId, ref: "User" },
    //   },
    // ],
    like_type: {
      type: String,
    },
  },
  {
    versionKey: false, // set to false then it wont create in mongodb
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;

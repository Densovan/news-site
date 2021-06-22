const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema(
  {
    user: {
      type: String, // foreign key ID from User
      default: "",
      required: true,
    },
    following: [
      {
        type: String, // foreign key ID from User
        default: "",
        required: true,
      },
    ],
    followers: [
      {
        type: String, // foreign key ID from User
        default: "",
        required: true,
      },
    ],
    follow: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Follow = mongoose.model("Follow", FollowSchema);
module.exports = Follow;

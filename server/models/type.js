const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createBy: {
      type: String, // foreign key ID from User
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Types = mongoose.model("Types", typeSchema);
module.exports = Types;

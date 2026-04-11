const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    reasons: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scan", scanSchema);
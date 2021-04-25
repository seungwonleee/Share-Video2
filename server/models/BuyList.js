const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyListSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

const BuyList = mongoose.model("BuyList", buyListSchema);

module.exports = { BuyList };

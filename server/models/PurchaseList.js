const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseListSchema = mongoose.Schema(
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

const PurchaseList = mongoose.model("PurchaseList", purchaseListSchema);

module.exports = { PurchaseList };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingBasketSchema = mongoose.Schema(
  {
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    madeFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userNickname: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    genre: {
      type: String,
    },
    filePath: {
      type: String,
    },
    cost: {
      type: Number,
    },
  },
  { timestamps: true }
);

const ShoppingBasket = mongoose.model("ShoppingBasket", shoppingBasketSchema);

module.exports = { ShoppingBasket };

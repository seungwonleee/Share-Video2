const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingBasketSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      type: String,
    },
    title: {
      type: String,
      maxlength: 50,
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
    //다른것들은 중복될 수 있으므로 filePath로 중복 저장을 필터링 한다.
    //filePath 형식 (uploads/날짜_파일명)
    filePath: {
      type: String,
      unique: 1,
    },
    cost: {
      type: Number,
    },
  },
  { timestamps: true }
);

const ShoppingBasket = mongoose.model("ShoppingBasket", shoppingBasketSchema);

module.exports = { ShoppingBasket };

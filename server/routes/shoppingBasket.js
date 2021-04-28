const express = require("express");
const router = express.Router();
const { ShoppingBasket } = require("../models/ShoppingBasket");

router.post("/addShoppingBasket", (req, res) => {
  // 장바구니 목록에 추가
  const shoppingBasket = new ShoppingBasket(req.body);

  ShoppingBasket.find({
    userFrom: req.body.userFrom,
    title: req.body.title,
  }).exec((err, shoppingbaskets) => {
    if (err) return res.status(400).send(err);
    //shoppingbaskets collection에서 유저와 제목이 일치하는것이 없다면 저장, 있다면 저장 X
    if (shoppingbaskets.length === 0) {
      shoppingBasket.save((err, shoppingBasket) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
        });
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Already have",
      });
    }
  });
});

router.post("/getShoppingBasketList", (req, res) => {
  //로그인한 사용자 장바구니 목록
  ShoppingBasket.find({ userFrom: req.body.loginUser })
    .populate(["videoId", "userFrom", "madeFrom"])
    .exec((err, shoppingbaskets) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, shoppingbaskets });
    });
});

router.post("/deleteShoppingBasketList", (req, res) => {
  //장바구니 목록 삭제
  const deleteItemList = req.body.deleteList;
  deleteItemList.map((item, index) => {
    ShoppingBasket.findOneAndDelete({ _id: item._id }).exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      //   res.status(200).json({ success: true });
    });
  });
  res.status(200).json({ success: true });
});

module.exports = router;

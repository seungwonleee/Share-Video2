const express = require("express");
const router = express.Router();
const { ShoppingBasket } = require("../models/ShoppingBasket");

router.post("/addShoppingBasket", (req, res) => {
  // 장바구니 목록에 추가
  const shoppingBasket = new ShoppingBasket(req.body);
  console.log(req.body);

  shoppingBasket.save((err, shoppingBasket) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/getShoppingBasketList", (req, res) => {
  //로그인한 사용자 장바구니 목록
  ShoppingBasket.find({ userFrom: req.body.loginUser })
    .populate("writer")
    .exec((err, shoppingbaskets) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, shoppingbaskets });
    });
});

module.exports = router;

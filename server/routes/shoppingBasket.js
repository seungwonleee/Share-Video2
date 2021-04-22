const express = require("express");
const router = express.Router();
const { ShoppingBasket } = require("../models/ShoppingBasket");

router.post("/addShoppingBasket", (req, res) => {
  // 장바구니 목록에 저장
  const shoppingBasket = new ShoppingBasket(req.body);
  console.log(req.body);

  shoppingBasket.save((err, video) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;

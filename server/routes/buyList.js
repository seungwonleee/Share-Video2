const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Video } = require("../models/Video");
const { BuyList } = require("../models/BuyList");

//구매 목록 저장
router.post("/saveBuyList", (req, res) => {
  //   console.log(req.body.userId);
  //   console.log(req.body.videoList);
  const userId = req.body.userId;
  const lists = req.body.videoList;
  lists.map((video) => {
    const buyList = new BuyList({
      userId: userId,
      videoId: video._id,
    });

    buyList.save((err, buyListResult) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

module.exports = router;

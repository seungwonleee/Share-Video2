const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Video } = require("../models/Video");
const { PurchaseList } = require("../models/PurchaseList");

//구매 목록 저장
router.post("/savePurchaseList", (req, res) => {
  //   console.log(req.body.userId);
  //   console.log(req.body.videoList);
  const userId = req.body.userId;
  const lists = req.body.videoList;
  lists.map((video) => {
    const buyList = new PurchaseList({
      userId: userId,
      videoId: video._id,
    });

    buyList.save((err, buyListResult) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

//구매 목록 가져오기 (userId 별로 가져온다.)
router.post("/getPurchaseList", (req, res) => {
  PurchaseList.find(req.body)
    .populate("videoId")
    .exec((err, buyLists) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, buyLists });
    });
});

//구매내역 삭제
router.post("/deletePurchaseList", (req, res) => {
  const deleteItemList = req.body.deleteList;
  deleteItemList.map((item, index) => {
    PurchaseList.findOneAndDelete({ _id: item._id }).exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      //   res.status(200).json({ success: true });
    });
  });
  res.status(200).json({ success: true });
});

module.exports = router;

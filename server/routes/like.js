const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Video } = require("../models/Video");

//좋아요 목록 저장
router.post("/uplike", (req, res) => {
  const like = new Like(req.body);
  //좋아요 정보를 저장
  Like.find(req.body).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    //likes collection에서 userId와 videoId가 일치하는것이 없다면 저장, 있다면 저장 X
    if (likes.length === 0) {
      like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true });
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Already like",
      });
    }
  });
});

//좋아요 취소
router.post("/unLike", (req, res) => {
  Like.findOneAndDelete(req.body).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

//좋아요 목록 가져오기 (videoId 별로 count 한다.)
router.post("/getLikes", (req, res) => {
  Like.find(req.body).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

module.exports = router;

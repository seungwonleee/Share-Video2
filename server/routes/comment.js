const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//댓글 저장
router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });

    Comment.find({ videoId: req.body.videoId })
      .populate("writer")
      .exec((err, comments) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, comments });
      });
  });
});

//댓글 출력
router.post("/getComments", (req, res) => {
  Comment.find({ videoId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

//댓글 삭제
router.post("/removeComment", (req, res) => {
  Comment.findOneAndDelete({ _id: req.body.commentId }).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });

    Comment.find({ videoId: req.body.videoId })
      .populate("writer")
      .exec((err, comments) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, comments });
      });
  });
});

module.exports = router;

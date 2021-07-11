const express = require("express");
const router = express.Router();
const ffmpeg = require("fluent-ffmpeg");
const { unlink } = require("fs");
const { Video } = require("../models/Video");
const { ShoppingBasket } = require("../models/ShoppingBasket");
const { Comment } = require("../models/Comment");
const { Like } = require("../models/Like");
const { PurchaseList } = require("../models/PurchaseList");
const { uploadVideo, uploadThumnail } = require("../middleware/upload");

// 업로드 video 저장
router.post("/uploadfiles", uploadVideo.single("file"), (req, res) => {
  // console.log(req.file);
  // req.file.location으로 s3 bucket에 업로드한 파일 주소를 받을 수 있다.
  let fileDuration = "";

  ffmpeg.ffprobe(req.file.location, function (err, metadata) {
    // console.log(metadata.format.duration);
    if (err) return res.status(400).send(err);
    fileDuration = metadata.format.duration;

    return res.status(200).json({
      success: true,
      filePath: req.file.location,
      fileName: req.file.originalname,
      fileDuration: fileDuration,
    });
  });
});

// 영상에대한 thumbnail 저장
router.post("/thumbnail", uploadThumnail.single("file"), (req, res) => {
  // console.log(req.file);
  // req.file.location으로 s3 bucket에 업로드한 파일 주소를 받을 수 있다.
  return res.status(200).json({
    thumbnailPath: req.file.location,
  });
});

// 영상 전체 데이터 저장(작성자, 파일 경로, thumbnail 경로 등등)
router.post("/saveVideoData", (req, res) => {
  const video = new Video(req.body);

  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// video collection 모두 호출
router.get("/getVideos", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos: videos });
    });
});

// 개인작품 영상 상세 정보 (individualWorkPage detail info)
router.post("/getVideo", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    });
});

// 내가 업로드한 작품 목록
router.post("/getMyVideos", (req, res) => {
  Video.find(req.body)
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});

router.post("/deleteMyVideos", (req, res) => {
  const deleteVideoLists = req.body.deleteList;

  deleteVideoLists.map(async (item, index) => {
    // 업로드한 video의 documents 삭제
    Video.findOneAndDelete({ _id: item._id }).exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
    });
    // DB 영상 삭제
    unlink(item.filePath, (err) => {
      if (err) return res.status(400).json({ success: false, err });
      console.log("thumbnail was deleted");
    });
    // DB 썸네일 삭제
    unlink(item.thumbnail, (err) => {
      if (err) return res.status(400).json({ success: false, err });
      console.log("video was deleted");
    });
    //해당 영상을 장바구니 목록에 추가한 모든 유저의 장바구니 목록에서 삭제
    await ShoppingBasket.deleteMany({ videoId: item._id }, (err) => {
      if (err) return res.status(400).json({ success: false, err });
      console.log("erased it from all the users's shoppingBaskets.");
    });
    // 해당 영상에 달린 모든 댓글 삭제
    await Comment.deleteMany({ videoId: item._id }, (err) => {
      if (err) return res.status(400).json({ success: false, err });
      console.log("erased it from all the users's comments.");
    });
    // 해당 영상을 좋아요 한 모든 유저의 Docuemnts 삭제
    await Like.deleteMany({ videoId: item._id }, (err) => {
      if (err) return res.status(400).json({ success: false, err });
      console.log("erased it from all the users's likes.");
    });
    // 해당 영상을 구매한 모든 유저의 Docuemnts 삭제
    await PurchaseList.deleteMany({ videoId: item._id }, (err) => {
      if (err) return res.status(400).json({ success: false, err });
      console.log("erased it from all the users's purchaseList.");
    });
  });
  res.status(200).json({ success: true });
});

module.exports = router;

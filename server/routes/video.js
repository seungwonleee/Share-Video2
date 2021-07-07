const express = require("express");
const router = express.Router();
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { unlink } = require("fs");
const { auth } = require("../middleware/auth");
const { User } = require("../models/User");
const { Video } = require("../models/Video");
const { ShoppingBasket } = require("../models/ShoppingBasket");
const { Comment } = require("../models/Comment");
const { Like } = require("../models/Like");
const { PurchaseList } = require("../models/PurchaseList");

//비디오 저장, 이름, 경로 생성, 확장자 검사
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

// 업로드 영상 저장
router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// 영상에대한 thumbnail 생성
router.post("/thumbnail", (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    // console.dir(metadata);
    // console.log(metadata.format.duration);
    if (err) return res.status(400).send(err);
    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      //   console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      //   console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      // Screenshots of the video
      count: 1,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
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
      res.status(200).json({ success: true, videos });
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

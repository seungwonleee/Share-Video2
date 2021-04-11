const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const mongoose = require("mongoose");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.post("/api/users/register", (req, res) => {
  //회원가입시 입력한 email과 firebase로부터 받은 uid를 DB에 저장한다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // console.log(req.body.uid);
  //사용자 uid를 DB에서 검색
  User.findOne({ uid: req.body.uid }, (err, user) => {
    // console.log('user', user)
    //해당 uid 유저가 없으면
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 uid에 해당하는 사용자가 없습니다.",
      });
    }

    //uid가 있다면 토큰 생성
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);

      // cookie에 토큰을 저장한다.
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id, userUid: user.uid });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //auth 미들웨어가 true이면 아래 응답
  //auth 미들웨어가 false이면 auth 미들웨어에서 응답처리
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    uid: req.user.uid,
    email: req.user.email,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) {
      return res.json({ logout: false, removeCookie: false, err });
    }
    // 저장된 Cookie 삭제
    res
      .clearCookie("x_auth")
      .status(200)
      .json({ removeCookie: "true", logout: "true" });
  });
});

app.get("/api/users/list", async (req, res) => {
  //등록된 사용자 목록 전체
  const userList = await User.find((err, docs) => {
    if (err) return res.json({ loadUser: "fail" });
  });
  res.status(200).json({ loadUser: "success", userList });
});

const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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
  .catch((error) => console.log(error));

app.post("/api/users/register", (req, res) => {
  //회원가입시 입력한 email과 password 등의 회원정보를 DB에 저장한다.
  const user = new User(req.body);

  user.save((error, userInfo) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // 입력받은 이메일을 DB에서 찾는다.
  User.findOne({ email: req.body.email }, (error, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "가입되어 있지 않은 계정입니다.",
      });
    }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 쿠키에 저장한다.
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
          userNickname: user.nickname,
        });
      });
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
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (error, user) => {
    if (error) {
      return res.json({ logout: false, removeCookie: false, error });
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
  const userList = await User.find((error, docs) => {
    if (error) return res.json({ loadUser: "fail" });
  });
  res.status(200).json({ loadUser: "success", userList });
});

const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

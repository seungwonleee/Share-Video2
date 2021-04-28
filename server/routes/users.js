const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.post("/register", (req, res) => {
  //회원가입시 입력한 email과 password 등의 회원정보를 DB에 저장한다.
  const user = new User(req.body);

  user.save((error, userInfo) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
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
          message: "비밀번호가 일치하지 않습니다.",
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

router.post("/findaccount", (req, res) => {
  // 입력받은 이메일을 DB에서 찾는다.
  // console.log(req.body);
  User.findOne({ email: req.body.email }, (error, user) => {
    if (!user) {
      return res.json({
        findAccount: false,
        message: "가입되어 있지 않은 Email 입니다.",
      });
    }
    // 이메일이 있다면 이름을 찾는다.
    User.findOne({ name: req.body.name }, (error, user) => {
      if (!user) {
        return res.json({
          findAccount: false,
          message: "가입되어 있지 않은 이름 입니다.",
        });
      }
      // 이메일과 닉네임이 일치한 경우
      return res.json({
        findAccount: true,
        user: user,
      });
    });
  });
});

router.post("/resetpassword", (req, res) => {
  const newPassword = req.body.password;
  // console.log("=====>", newPassword);
  // 입력받은 이메일을 DB에서 찾는다.
  User.findOne({ email: req.body.email }, (error, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "가입되어 있지 않은 계정입니다.",
      });
    }
    // 새로입력 된 비밀번호를 bcrypt로 암호화
    user.resetPassword(newPassword, (err, reset) => {
      if (err) {
        return res.json({
          reset: false,
          message: "비밀번호 초기화 실패",
        });
      }
      // 새로운 비밀번호 암호화에 성공하면 해당 계정 비밀번호 업데이트
      User.findOneAndUpdate(
        { email: req.body.email },
        { $set: { password: reset } },
        { new: true },
        (err, doc) => {
          if (error) {
            res.json({
              resetPassword: "false",
            });
          }
        }
      );
    });
  });
  res.json({
    resetPassword: true,
  });
});

router.get("/auth", auth, (req, res) => {
  //auth 미들웨어가 true이면 아래 응답
  //auth 미들웨어가 false이면 auth 미들웨어에서 응답처리
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    nickname: req.user.nickname,
  });
});

router.get("/logout", auth, (req, res) => {
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

router.get("/list", async (req, res) => {
  //등록된 사용자 목록 전체
  const userList = await User.find((error, docs) => {
    if (error) return res.json({ loadUser: "fail" });
  });
  res.status(200).json({ loadUser: "success", userList });
});

module.exports = router;

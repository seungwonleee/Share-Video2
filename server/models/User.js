const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: 1,
  },
  name: {
    type: String,
  },
  nickname: {
    type: String,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  eventAgreement: {
    type: Boolean,
  },
  createdAt: {
    type: Number,
  },
  google: {
    type: String,
  },
  github: {
    type: String,
  },
  profile: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    //사용자 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //일반 비밀번호 123456    bcrypt로 암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // jsonwebtoken을 이용해서 token을 생성
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //토큰을 decode 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.methods.resetPassword = function (newPassword, cb) {
  //새로 입력받은 비밀번호를 암호화 한다.
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return cb(err);

    bcrypt.hash(newPassword, salt, function (err, hash) {
      if (err) return cb(err);
      cb(null, hash);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };

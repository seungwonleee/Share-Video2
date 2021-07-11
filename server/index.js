const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((error) => console.log(error));

// Helmet은 보안 관련 HTTP 헤더를 설정
app.use(helmet());
// 모든 응답 압축해서 gzip 형태로 client로 전달
app.use(compression());
// 데이터 전송 20mb 이상 제한
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/video", require("./routes/video"));
app.use("/api/shoppingBasket", require("./routes/shoppingBasket"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/api/purchaseList", require("./routes/purchaseList"));

//node js server에 저장된 image를 client로 전달
//참고: https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
//참고: https://expressjs.com/en/starter/static-files.html
app.use("/uploads", express.static("uploads"));

// 배포시 Serve static assets
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

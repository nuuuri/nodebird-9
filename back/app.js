const express = require("express");
const app = express();
const cors = require("cors");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json()); // 프론트로부터 전달 받은 json은 req에 넣어줌
app.use(express.urlencoded({ extended: true })); // form 데이터 처리

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중");
});

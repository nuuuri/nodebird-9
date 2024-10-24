const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

const passportConfig = require("./passport");

dotenv.config();

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true,
  })
);
app.use(express.json()); // 프론트로부터 전달 받은 json은 req에 넣어줌
app.use(express.urlencoded({ extended: true })); // form 데이터 처리
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/post", postRouter);
app.use("/user", userRouter);

// app.use((err, req, res, next) => {}); // 해당 위치에 에러 처리 미들웨어가 내부적으로 존재

app.listen(3065, () => {
  console.log("서버 실행 중");
});

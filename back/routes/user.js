const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // serverError 처리
    if (err) {
      console.error(err);
      return next(err);
    }

    // clientError 처리
    if (info) {
      return res.status(401).send(info.reason); // 401 허가되지 않음
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserInfoWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });

      return res.status(200).json(fullUserInfoWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy();
    res.status(200).send("ok");
  });
});

// POST /user
router.post("/", async (req, res, next) => {
  try {
    // email 중복 체크
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await User.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User, Post } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

// GET /user
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserInfoWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id", "nickname"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id", "nickname"],
          },
        ],
      });
      res.status(200).json(fullUserInfoWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /user
router.post("/", isNotLoggedIn, async (req, res, next) => {
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

router.post("/login", isNotLoggedIn, (req, res, next) => {
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
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id", "nickname"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id", "nickname"],
          },
        ],
      });

      return res.status(200).json(fullUserInfoWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy();
    res.status(200).send("ok");
  });
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

router.patch("/:UserId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.UserId } });

    if (!user) {
      res.status(403).send("없는 사람을 팔로우할 수 없습니다.");
    }

    await user.addFollowers(req.user.id);
    res.status(200).json({ id: parseInt(req.params.UserId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:UserId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.UserId } });

    if (!user) {
      res.status(403).send("없는 사람을 언팔로우할 수 없습니다.");
    }

    await user.removeFollowers(req.user.id);
    res.status(200).json({ id: parseInt(req.params.UserId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 팔로워 차단 (팔로우 취소)
router.delete("/:UserId/follower", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.UserId } });

    if (!user) {
      res.status(403).send("없는 유저입니다.");
    }

    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

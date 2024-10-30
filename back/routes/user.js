const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { Op } = require("sequelize");

const { User, Post, Comment, Image } = require("../models");
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
      res.status(401).send("로그인이 필요합니다.");
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

router.get("/followers", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      res.status(403).send("없는 사람을 찾으려고 하시네요?.");
    }

    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit, 10),
    });

    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/followings", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      res.status(403).send("없는 사람을 찾으려고 하시네요?.");
    }

    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit, 10),
    });

    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:UserId", async (req, res, next) => {
  try {
    const fullUserInfoWithoutPassword = await User.findOne({
      where: { id: req.params.UserId },
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

    if (fullUserInfoWithoutPassword) {
      const data = fullUserInfoWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인정보 침해 예방
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json("존재하지 않는 사용자입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
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

router.get("/:UserId/posts", async (req, res, next) => {
  try {
    const where = { UserId: req.params.UserId };

    // 초기 로딩이 아닐 때
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }; // (~보다 작은), $lt: parseInt(req.query.lastId, 10)
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      //   offset: 0,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id", "nickname"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

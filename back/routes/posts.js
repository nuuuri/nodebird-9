const expres = require("express");
const { Post, User, Image, Comment } = require("../models");

const router = expres.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      //  where: { id: lastId },
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
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

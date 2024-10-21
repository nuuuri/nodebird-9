module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // 한글 저장
      charset: "utf8mb4", //mb4 : 이모티콘 허용
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // N:M 관계
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // 리트윗
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };
  return Post;
};

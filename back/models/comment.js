const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Comment",
        tableName: "comments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User); // UserId 컬럼을 생성
    db.Comment.belongsTo(db.Post); // PostId 컬럼을 생성
  }
};

// module.exports = (sequelize, DataTypes) => {
//   const Comment = sequelize.define(
//     "Comment",
//     {
//       content: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//     },
//     {
//       charset: "utf8mb4",
//       collate: "utf8mb4_general_ci",
//     }
//   );
//   Comment.associate = (db) => {
//     db.Comment.belongsTo(db.User); // UserId 컬럼을 생성
//     db.Comment.belongsTo(db.Post); // PostId 컬럼을 생성
//   };
//   return Comment;
// };

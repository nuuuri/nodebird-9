const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        // MYSQl에는 user 테이블 생성
        // id는 MYSQL에서 자동 생성
        email: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
          unique: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "User",
        tableName: "users",
        // 한글 저장
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // through : Table명
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  }
};

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     "User",
//     {
//       // MYSQl에는 user 테이블 생성
//       // id는 MYSQL에서 자동 생성
//       email: {
//         type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
//         allowNull: false, // 필수
//         unique: true,
//       },
//       password: {
//         type: DataTypes.STRING(100),
//         allowNull: false, // 필수
//       },
//       nickname: {
//         type: DataTypes.STRING(30),
//         allowNull: false, // 필수
//       },
//     },
//     {
//       // 한글 저장
//       charset: "utf8",
//       collate: "utf8_general_ci",
//     }
//   );
//   User.associate = (db) => {
//     db.User.hasMany(db.Post);
//     db.User.hasMany(db.Comment);
//     db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // through : Table명
//     db.User.belongsToMany(db.User, {
//       through: "Follow",
//       as: "Followers",
//       foreignKey: "FollowingId",
//     });
//     db.User.belongsToMany(db.User, {
//       through: "Follow",
//       as: "Followings",
//       foreignKey: "FollowerId",
//     });
//   };
//   return User;
// };

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
      // 한글 저장
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {};
  return User;
};
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("users", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: DataTypes.STRING(45),
    lastName: DataTypes.STRING(45),
    email: DataTypes.STRING(75),
    password: DataTypes.STRING(255),
    loginToken: DataTypes.STRING(255),
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6),
    isActive: {
      type: DataTypes.ENUM(0, 1),
      defaultValue: 1,
      comment: "0-NO, 1-YES",
    },
    isDeleted: {
      type: DataTypes.ENUM(0, 1),
      defaultValue: 0,
      comment: "0-NO, 1-YES",
    },
  });
  return user;
};

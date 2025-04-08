module.exports = (sequelize, DataTypes) => {
  const taskStatus = sequelize.define("task_status", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    code: DataTypes.STRING(45),
    name: DataTypes.STRING(75),
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
  return taskStatus;
};

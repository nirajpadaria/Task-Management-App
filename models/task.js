module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define("tasks", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: DataTypes.STRING(45),
    title: DataTypes.STRING(75),
    description: DataTypes.STRING(255),
    statusId: DataTypes.BIGINT,
    dueDate: DataTypes.DATE(6),
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
  return task;
};

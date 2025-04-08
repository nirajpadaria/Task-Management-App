require("dotenv").config();
const Sequelize = require("sequelize");
const DataTypes = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: process.env.DB_TIMEZONE,
  define: {
    freezeTableName: true,
  },
});

const user = require("../models/userModel")(sequelize, DataTypes);

const task = require("../models/task")(sequelize, DataTypes);

const taskStatus = require("../models/taskStatus")(sequelize, DataTypes);

const associations = {};

associations.taskStatuDetail = task.hasOne(taskStatus, {
  as: "taskStatusData",
  foreignKey: "id",
  sourceKey: "statusId",
});

associations.taskUserDetail = task.hasOne(user, {
  as: "taskUserData",
  foreignKey: "id",
  sourceKey: "userId",
});

module.exports = {
  sequelize,
  user,
  task,
  taskStatus,
};

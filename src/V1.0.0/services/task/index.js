const addTaskService = require("./add");
const listTaskService = require("./list");
const getTaskService = require("./get");
const updateTaskService = require("./update");
const deleteTaskService = require("./delete");

module.exports = {
  addTaskService,
  getTaskService,
  listTaskService,
  updateTaskService,
  deleteTaskService,
};

const httpStatus = require("http-status-codes").StatusCodes;
const {
  addTaskService,
  getTaskService,
  listTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../../services/task");

module.exports.taskAdd = async (options) => {
  try {
    return await addTaskService.manageData(options);
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: "something went wrong",
      additionalInfo: error,
    };
  }
};

module.exports.taskGet = async (options) => {
  try {
    return await getTaskService.manageData(options);
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: "something went wrong",
      additionalInfo: error,
    };
  }
};

module.exports.taskList = async (options) => {
  try {
    return await listTaskService.manageData(options);
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: "something went wrong",
      additionalInfo: error,
    };
  }
};

module.exports.taskUpdate = async (options) => {
  try {
    return await updateTaskService.manageData(options);
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: "something went wrong",
      additionalInfo: error,
    };
  }
};

module.exports.taskDelete = async (options) => {
  try {
    return await deleteTaskService.manageData(options);
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: "something went wrong",
      additionalInfo: error,
    };
  }
};

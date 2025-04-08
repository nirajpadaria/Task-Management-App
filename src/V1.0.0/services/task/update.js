const { task, taskStatus } = require("../../../../database/connection");
const httpStatus = require("http-status-codes").StatusCodes;

module.exports.manageData = async (options) => {
  const checkActive = await task.findOne({
    where: { id: options.id, userId: options.userId, isActive: 1 },
  });
  if (checkActive) {
    const checkResource = await checkTaskExist(options);
    if (checkResource === true) {
      return {
        isSuccess: false,
        message: "Task already exists",
        code: httpStatus.BAD_REQUEST,
        data: {},
      };
    }
    const taskCreate = await task.update(createObject(options, checkActive), {
      where: { id: options.id },
    });
    if (taskCreate[0] == 1) {
      return {
        isSuccess: true,
        message: "Task updated successfully",
        code: httpStatus.OK,
        data: {},
      };
    }
    return {
      isSuccess: false,
      message: "Task updation failed",
      code: httpStatus.BAD_REQUEST,
      data: {},
    };
  } else {
    return {
      isSuccess: false,
      message: "This record is not found",
      code: httpStatus.BAD_REQUEST,
      data: {},
    };
  }
};

const createObject = (options, taskData) => {
  return {
    title: options.title,
    description: options.description,
    dueDate: options.dueDate,
    statusId: !options.statusId
      ? taskData?.dataValues?.statusId
      : options.statusId,
  };
};

const checkTaskExist = async (options) => {
  const checkTask = await task.findOne({
    where: { title: options.title, isActive: 1 },
  });

  if (checkTask && checkTask?.dataValues?.id != options.id) {
    return true;
  }
  return false;
};

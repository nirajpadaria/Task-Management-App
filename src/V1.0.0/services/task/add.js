const { task, taskStatus } = require("../../../../database/connection");
const httpStatus = require("http-status-codes").StatusCodes;

module.exports.manageData = async (options) => {
  const taskObj = await createObject(options);

  const checkResource = await checkTaskExist(taskObj);
  if (checkResource === true) {
    return {
      isSuccess: false,
      message: "Task already exists",
      code: httpStatus.BAD_REQUEST,
      data: {},
    };
  }
  const taskCreate = await task.create(taskObj);
  if (taskCreate) {
    const result = taskCreate;
    return {
      isSuccess: true,
      message: "Task created successfully",
      code: httpStatus.OK,
      data: { result },
    };
  }
  return {
    isSuccess: false,
    message: "Task creation failed",
    code: httpStatus.BAD_REQUEST,
    data: {},
  };
};

const createObject = async (options) => {
  const getStatusData = await taskStatus.findOne({
    where: { name: "pending" },
  });
  console.log("options", options);

  return {
    title: options.title,
    description: options.description,
    dueDate: options.dueDate,
    statusId: getStatusData?.dataValues?.id,
    userId: options.id,
  };
};

const checkTaskExist = async (options) => {
  const checkTask = await task.findOne({
    where: { title: options.title, isActive: 1 },
  });
  if (checkTask) {
    return true;
  }
  return false;
};

const { task } = require("../../../../database/connection");
const httpStatus = require("http-status-codes").StatusCodes;

module.exports.manageData = async (options) => {
  const checkTask = await task.findOne({
    where: { id: options.id, userId: options.userId, isActive: 1 },
  });
  if (checkTask) {
    const taskDelete = await task.update(
      { isActive: 0, isDeleted: 1 },
      { where: { id: options.id } }
    );

    if (taskDelete[0] === 0) {
      return {
        isSuccess: false,
        message: "Task deletaion failed",
        code: httpStatus.BAD_REQUEST,
        data: {},
      };
    }

    return {
      isSuccess: true,
      message: "Task deleted successfully",
      code: httpStatus.OK,
      data: {},
    };
  }
  return {
    isSuccess: false,
    message: "This record is not found",
    code: httpStatus.BAD_REQUEST,
    data: {},
  };
};

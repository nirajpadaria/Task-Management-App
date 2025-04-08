const httpStatus = require("http-status-codes").StatusCodes;
const { task, taskStatus, user } = require("../../../../database/connection");

module.exports.manageData = async (options) => {
  const taskData = await task.findOne({
    where: { id: options.id, userId: options.userId, isActive: 1 },
    include: [
      {
        model: taskStatus,
        as: "taskStatusData",
        attributes: ["name"],
      },
      {
        model: user,
        as: "taskUserData",
        attributes: ["firstName", "lastName"],
      },
    ],
  });

  if (taskData) {
    const updatedData = {
      id: taskData?.dataValues?.id,
      userId: taskData?.dataValues?.userId,
      userName: `${taskData?.dataValues?.taskUserData?.dataValues?.firstName} ${taskData?.dataValues?.taskUserData?.dataValues?.lastName}`,
      title: taskData?.dataValues?.title,
      description: taskData?.dataValues?.description,
      dueDate: taskData?.dataValues?.dueDate,
      statusId: taskData?.dataValues?.statusId,
      statusName: taskData?.dataValues?.taskStatusData?.dataValues?.name,
      isActive: taskData?.dataValues?.isActive,
      isDeleted: taskData?.dataValues?.isDeleted,
      createdAt: taskData?.dataValues?.createdAt,
      updatedAt: taskData?.dataValues?.updatedAt,
    };
    return {
      isSuccess: true,
      message: "success",
      code: httpStatus.OK,
      data: { task: updatedData },
    };
  }
  return {
    isSuccess: false,
    message: "Invalid id",
    code: httpStatus.BAD_REQUEST,
    data: {},
  };
};

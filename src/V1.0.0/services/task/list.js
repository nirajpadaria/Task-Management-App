const httpStatus = require("http-status-codes").StatusCodes;
const { task, taskStatus, user } = require("../../../../database/connection");

module.exports.manageData = async (options) => {
  let filterTask = [];

  if (options?.query?.statusId != undefined) {
    filterTask.push({ statusId: Number(options?.query?.statusId) });
  }

  const taskData = await task.findAll({
    where: [{ userId: options.id, isActive: 1 }, ...filterTask],
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

  if (taskData.length) {
    const updatedData = await Promise.all(
      taskData.map(async (dataInfo) => {
        let data = {
          id: dataInfo?.dataValues?.id,
          userId: dataInfo?.dataValues?.userId,
          userName: `${dataInfo?.dataValues?.taskUserData?.dataValues?.firstName} ${dataInfo?.dataValues?.taskUserData?.dataValues?.lastName}`,
          title: dataInfo?.dataValues?.title,
          description: dataInfo?.dataValues?.description,
          dueDate: dataInfo?.dataValues?.dueDate,
          statusId: dataInfo?.dataValues?.statusId,
          statusName: dataInfo?.dataValues?.taskStatusData?.dataValues?.name,
          isActive: dataInfo?.dataValues?.isActive,
          isDeleted: dataInfo?.dataValues?.isDeleted,
          createdAt: dataInfo?.dataValues?.createdAt,
          updatedAt: dataInfo?.dataValues?.updatedAt,
        };
        return data;
      })
    );
    return {
      isSuccess: true,
      message: "success",
      code: httpStatus.OK,
      data: { task: updatedData },
    };
  }
  return {
    isSuccess: false,
    message: "Data not found",
    code: httpStatus.BAD_REQUEST,
    data: {},
  };
};

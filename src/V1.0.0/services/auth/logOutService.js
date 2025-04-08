const httpStatus = require("http-status-codes").StatusCodes;
const { user } = require("../../../../database/connection");

module.exports.manageData = async (options) => {
  try {
    const updateDeviceToken = await user.update(
      { loginToken: null },
      { where: { id: options.id } }
    )
    if (updateDeviceToken[0] == 1) {
      return {
        isSuccess: true,
        message: "LogOut Successfully",
        code: httpStatus.OK,
        data: {},
      }
    }
    return {
      isSuccess: false,
      message: "Failed to logOut",
      code: httpStatus.BAD_REQUEST,
      data: {},
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: "Failed to logOut",
      code: httpStatus.BAD_REQUEST,
      data: { error },
    };
  }
};

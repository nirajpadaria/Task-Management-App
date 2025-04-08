const httpStatus = require("http-status-codes").StatusCodes;
const registerService = require("../../services/auth/registrationService");
const logInService = require("../../services/auth/logInService");
const logOutService = require("../../services/auth/logOutService");

module.exports.registration = async (options) => {
  try {
    return await registerService.manageData(options);
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Something went wrong",
      additionalInfo: error,
    };
  }
};

module.exports.logIn = async (options) => {
  try {
    return await logInService.manageData(options);
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Something went wrong",
      additionalInfo: error,
    };
  }
};

module.exports.logOut = async (options) => {
  try {
    return await logOutService.manageData(options);
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Something went wrong",
      additionalInfo: error,
    };
  }
};

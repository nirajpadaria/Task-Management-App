const httpStatus = require("http-status-codes").StatusCodes;
const { user } = require("../../../../database/connection");
const bcrypt = require("bcryptjs");

module.exports.manageData = async (options) => {
  try {
    const userDetails = createObject(options);

    const checkEmailExist = await checkEamil(userDetails.email);
    if (checkEmailExist === true) {
      return {
        isSuccess: false,
        message: "User already exists",
        code: httpStatus.BAD_REQUEST,
        data: {},
      };
    }

    const userCreate = await user.create(userDetails);

    if (userCreate) {
      return {
        isSuccess: true,
        message: "Registration Successfully",
        code: httpStatus.CREATED,
        data: {},
      };
    } else {
      return {
        isSuccess: false,
        message: "Registration Failed",
        code: httpStatus.BAD_REQUEST,
        data: {},
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: "Something went wrong",
      code: httpStatus.INTERNAL_SERVER_ERROR,
      data: {},
    };
  }
};

const createObject = (options) => {
  const salt = bcrypt.genSaltSync(5);
  const hashPassword = bcrypt.hashSync(options.password.toString(), salt);
  return {
    firstName: options?.firstName,
    lastName: options?.lastName,
    email: options?.email,
    password: hashPassword,
  };
};

const checkEamil = async (options) => {
  const checkEmail = await user.findOne({
    where: { email: options, isActive: 1 },
  });

  if (checkEmail) {
    return true;
  }
  return false;
};

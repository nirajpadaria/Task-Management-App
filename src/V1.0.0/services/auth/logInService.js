const httpStatus = require("http-status-codes").StatusCodes;
const { user } = require("../../../../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.manageData = async (options) => {
  try {
    const emailExist = await user.findOne({
      where: { email: options.email },
    });
    if (!emailExist) {
      return {
        isSuccess: false,
        code: httpStatus.UNAUTHORIZED,
        message: "Invalid email",
        data: {},
      };
    } else if (
      !bcrypt.compareSync(
        options.password.toString(),
        emailExist?.dataValues?.password
      )
    ) {
      return {
        isSuccess: false,
        code: httpStatus.UNAUTHORIZED,
        message: "Invalid password",
        data: {},
      };
    } else {
      const token = jwt.sign(
        {
          id: emailExist.dataValues.id,
          email: emailExist.dataValues.email,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "24h",
        }
      );
      await user.update(
        { loginToken: token },
        { where: { id: emailExist.dataValues.id } }
      );
      return {
        isSuccess: true,
        code: httpStatus.OK,
        message: "Login successfully",
        data: { token },
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: "Failed to login",
      code: httpStatus.BAD_REQUEST,
      data: { error },
    };
  }
};

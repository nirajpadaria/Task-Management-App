const joi = require("joi");
const validationObjects = require("./validationObjects");
const httpStatus = require("http-status-codes").StatusCodes;

module.exports.validation = (reqBody, model) => {
  try {
    return joi.object(validationObjects[model]).validate(reqBody);
  } catch (error) {
    return error;
  }
};

module.exports.generateValidationResponse = async (ret) => {
  let message = "";
  ret.error.details.forEach((element) => {
    message += `${element.context.label}`;
  });
  return {
    code: httpStatus.UNPROCESSABLE_ENTITY,
    message: message,
  };
};

const joi = require("joi");

module.exports = {
  registration: {
    firstName: joi.string().required().label("First Name is required"),
    lastName: joi.string().required().label("Last Name is required"),
    email: joi.string().email().required().label("Please enter a valid email"),
    password: joi.string().min(6).required().label("Password is required"),
  },
  taskCreate: {
    title: joi.string().required().label("Title is required"),
    description: joi.string(),
    dueDate: joi.string(),
  },
  taskUpdate: {
    title: joi.string().required().label("Title is required"),
    description: joi.string(),
    dueDate: joi.string(),
    statusId: joi.number(),
  },
};

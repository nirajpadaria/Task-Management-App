const express = require("express");
const router = new express.Router();
const task = require("../../controller//taskController/taskController");
const token = require("../../middleware/authentication");
const validateFunctions = require("../../validation/validateFunctions");

router.post("", token.verifyTokenAuthentication(), async (req, res, next) => {
  try {
    const joiReturn = validateFunctions.validation(req.body, "taskCreate");
    if (joiReturn.error) {
      const joiResult = await validateFunctions.generateValidationResponse(
        joiReturn
      );
      res.status(joiResult.code).send({ ...joiResult });
      return next(JSON.stringify(joiResult));
    }

    const options = { ...req.body, id: req.token_parse?.id };
    const result = await task.taskAdd(options);
    res.status(result.code).send({ ...result });
    return next(JSON.stringify(result));
  } catch (err) {
    return next(err);
  }
});

router.get("", token.verifyTokenAuthentication(), async (req, res, next) => {
  try {
    const options = { id: req?.token_parse?.id, query: req.query };
    const result = await task.taskList(options);
    res.status(result.code).send({ ...result });
    return next(JSON.stringify(result));
  } catch (err) {
    return next(err);
  }
});

router.get(
  "/:id",
  token.verifyTokenAuthentication(),
  async (req, res, next) => {
    try {
      const options = { id: req.params.id, userId: req?.token_parse?.id };
      const result = await task.taskGet(options);
      res.status(result.code).send({ ...result });
      return next(JSON.stringify(result));
    } catch (err) {
      return next(err);
    }
  }
);

router.put(
  "/:id",
  token.verifyTokenAuthentication(),
  async (req, res, next) => {
    try {
      const joiReturn = validateFunctions.validation(req.body, "taskUpdate");
      if (joiReturn.error) {
        const joiResult = await validateFunctions.generateValidationResponse(
          joiReturn
        );
        res.status(joiResult.code).send({ ...joiResult });
        return next(JSON.stringify(joiResult));
      }

      const options = {
        ...req.body,
        id: req.params.id,
        userId: req?.token_parse?.id,
      };
      const result = await task.taskUpdate(options);
      res.status(result.code).send({ ...result });
      return next(JSON.stringify(result));
    } catch (err) {
      return next(err);
    }
  }
);

router.delete(
  "/:id",
  token.verifyTokenAuthentication(),
  async (req, res, next) => {
    try {
      const options = {
        id: req.params.id,
        userId: req?.token_parse?.id,
      };
      const result = await task.taskDelete(options);
      res.status(result.code).send({ ...result });
      return next(JSON.stringify(result));
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;

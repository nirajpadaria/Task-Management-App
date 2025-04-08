const express = require("express");
const router = new express.Router();
const authController = require("../../controller/authController/authController");
const token = require("../../middleware/authentication");
const validateFunctions = require("../../validation/validateFunctions");

router.post("/registration", async (req, res, next) => {
  try {
    const joiReturn = validateFunctions.validation(req.body, "registration");
    if (joiReturn.error) {
      const joiResult = await validateFunctions.generateValidationResponse(
        joiReturn
      );
      res.status(joiResult.code).send({ ...joiResult });
      return next(JSON.stringify(joiResult));
    }
    const options = req.body;

    const result = await authController.registration(options);
    res.status(result.code).send({ ...result });
    return next(JSON.stringify(result));
  } catch (err) {
    return next(err);
  }
});

router.post("/logIn", async (req, res, next) => {
  try {
    const options = req.body;
    const result = await authController.logIn(options);
    res.status(result.code).send({ ...result });
    return next(JSON.stringify(result));
  } catch (err) {
    return next(err);
  }
});

router.post(
  "/logOut",
  token.verifyTokenAuthentication(),
  async (req, res, next) => {
    try {
      const options = req.token_parse;
      const result = await authController.logOut(options);
      res.status(result.code).send({ ...result });
      return next(JSON.stringify(result));
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;

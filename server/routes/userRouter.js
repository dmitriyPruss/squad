const { Router } = require("express");
const validators = require("./../middlewares/validators");
const hashPass = require("./../middlewares/hashPassMiddle");
const userController = require("./../controllers/userController");
const { checkToken, checkAuth } = require("./../middlewares/checkToken");
const basicMiddlewares = require("./../middlewares/basicMiddlewares");
const upload = require("./../utils/fileUpload");

const userRouter = Router();

userRouter.get("/getUser", checkAuth);

userRouter.get(
  "/transactions",
  checkToken,
  basicMiddlewares.onlyForCreative,
  userController.getUserTransactions
);

userRouter.post(
  "/cashout",
  checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

userRouter.post(
  "/pay",
  checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

userRouter.post(
  "/registration",
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

userRouter.patch("/login", validators.validateLogin, userController.login);

userRouter.patch(
  "/changeMark",
  checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

userRouter.patch(
  "/updateUser",
  checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

module.exports = userRouter;

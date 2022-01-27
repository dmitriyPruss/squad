const { Router } = require('express');
const validators = require('./../middlewares/validators');
const hashPass = require('./../middlewares/hashPassMiddle');
const userController = require('./../controllers/userController');
const { checkToken, checkAuth } = require('./../middlewares/checkToken');
const basicMiddlewares = require('./../middlewares/basicMiddlewares');
const upload = require('./../utils/fileUpload');

const userRouter = Router();

userRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

userRouter.post('/login', validators.validateLogin, userController.login);

userRouter.post(
  '/pay',
  checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

userRouter.post('/getUser', checkAuth);

userRouter.post(
  '/changeMark',
  checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

userRouter.post(
  '/updateUser',
  checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

userRouter.post(
  '/cashout',
  checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

module.exports = userRouter;

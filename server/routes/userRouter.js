const { Router } = require("express");
const { checkToken, checkAuth } = require("./../middlewares/checkToken");
const hashPass = require("./../middlewares/hashPassMiddle");
const {
  onlyForCreative,
  onlyForCustomer,
  parseBody,
} = require("./../middlewares/basicMiddlewares");
const {
  validateContestCreation,
  validateLogin,
  validateRegistrationData,
} = require("./../middlewares/validators");
const {
  getUserTransactions,
  cashout,
  registration,
  login,
  changeMark,
  updateUser,
  payment,
} = require("./../controllers/userController");
const { uploadAvatar, uploadContestFiles } = require("./../utils/fileUpload");

const userRouter = Router();

userRouter.get("/getUser", checkAuth);
userRouter.get(
  "/transactions",
  checkToken,
  onlyForCreative,
  getUserTransactions
);

userRouter.post("/cashout", checkToken, onlyForCreative, cashout);
userRouter.post(
  "/registration",
  validateRegistrationData,
  hashPass,
  registration
);

userRouter.patch("/login", validateLogin, login);
userRouter.patch("/changeMark", checkToken, onlyForCustomer, changeMark);
userRouter.patch("/updateUser", checkToken, uploadAvatar, updateUser);
userRouter.patch(
  "/pay",
  checkToken,
  onlyForCustomer,
  uploadContestFiles,
  parseBody,
  validateContestCreation,
  payment
);

module.exports = userRouter;

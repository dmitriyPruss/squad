const {
  registrationSchema,
  loginSchema,
  contestSchema,
} = require("../validationSchemes/schemes");
const BadRequestError = require("../errors/BadRequestError");

module.exports.validateRegistrationData = async (req, res, next) => {
  const validationResult = await registrationSchema.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError("Invalid data for registration"));
  } else {
    next();
  }
};

module.exports.validateLogin = async (req, res, next) => {
  const validationResult = await loginSchema.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    return next(new BadRequestError("Invalid data for login"));
  }
};

module.exports.validateContestCreation = (req, res, next) => {
  const promiseArray = [];
  req.body.contests.forEach((el) => {
    promiseArray.push(contestSchema.isValid(el));
  });
  return Promise.all(promiseArray)
    .then((results) => {
      results.forEach((result) => {
        if (!result) {
          return next(new BadRequestError());
        }
      });
      next();
    })
    .catch((err) => {
      next(err);
    });
};

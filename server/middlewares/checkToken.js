const jwt = require("jsonwebtoken");
const _ = require("lodash");
const TokenError = require("../errors/TokenError");
const userQueries = require("../controllers/queries/userQueries");
const { JWT_SECRET } = require("../constants");

module.exports.checkAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return next(new TokenError());
  }

  try {
    const tokenData = jwt.verify(accessToken, JWT_SECRET);

    const foundUser = await userQueries.findUser({ id: tokenData.userId });

    const tokenUserData = _.omit(foundUser, [
      "accessToken",
      "password",
      "rating",
    ]);

    res.status(200).send(tokenUserData);
  } catch (err) {
    next(new TokenError());
  }
};

module.exports.checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return next(new TokenError());
  }

  try {
    req.tokenData = jwt.verify(accessToken, JWT_SECRET);
    next();
  } catch (err) {
    next(new TokenError("Session expired or token is invalid"));
  }
};

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries = require('../controllers/queries/userQueries');

module.exports.checkAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    const tokenData = jwt.verify(accessToken, JWT_SECRET);
    
    const foundUser = await userQueries.findUser({ id: tokenData.userId });

    const {
      firstName,
      lastName,
      role,
      id,
      avatar,
      displayName,
      balance,
      email
    } = foundUser;

    res.send({
      firstName,
      lastName,
      role,
      id,
      avatar,
      displayName,
      balance,
      email
    });
  } catch (err) {
    next(new TokenError());
  }
};

module.exports.checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    req.tokenData = jwt.verify(accessToken, JWT_SECRET);
    next();
  } catch (err) {
    next(new TokenError());
  }
};

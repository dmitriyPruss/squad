const { Contest } = require("../models/postgreModels");
const { Op } = require("sequelize");
const RightsError = require("../errors/RightsError");
const ServerError = require("../errors/ServerError");
const { mapStringToValues } = require("../utils/functions");
const {
  CUSTOMER,
  CREATOR: { NAME },
  MODERATOR,
  CONTEST: {
    STATUS: { ACTIVE, FINISHED },
  },
} = require("../constants");

module.exports.parseBody = (req, res, next) => {
  const { contests } = req.body;

  req.body.contests = JSON.parse(contests);
  for (let i = 0; i < contests.length; i++) {
    if (contests[i].haveFile) {
      const file = req.files.splice(0, 1);
      req.body.contests[i].fileName = file[0].filename;
      req.body.contests[i].originalFileName = file[0].originalname;
    }
  }
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  let result = null;

  const {
    params: { contestId: id },
    tokenData: { userId, role },
  } = req;

  try {
    if (req.tokenData.role === CUSTOMER) {
      result = await Contest.findOne({
        where: { id, userId },
      });
    } else if (role === NAME) {
      result = await Contest.findOne({
        where: {
          id,
          status: {
            [Op.or]: [ACTIVE, FINISHED],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role !== NAME) {
    next(new RightsError());
  } else {
    next();
  }
};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role !== CUSTOMER) {
    return next(new RightsError("This page is only for customers"));
  } else {
    next();
  }
};

module.exports.onlyForModerator = (req, res, next) => {
  if (req.tokenData.role !== MODERATOR) {
    return next(new RightsError("This page is only for moderator"));
  } else {
    next();
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  const {
    tokenData: { role },
    body: { contestId: id },
  } = req;

  if (role === CUSTOMER || role === MODERATOR) {
    return next(new RightsError());
  }
  try {
    const result = await Contest.findOne({
      where: {
        id,
      },
      raw: true,
    });

    if (result.status === ACTIVE) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  const {
    tokenData: { userId },
    body: { contestId: id },
  } = req;

  try {
    const result = Contest.findOne({
      where: {
        userId,
        id,
        status: { [Op.not]: FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.parseQuery = (req, res, next) => {
  const { query } = req;

  for (let key in query) {
    req.query[key] = mapStringToValues(query[key]);
  }

  next();
};

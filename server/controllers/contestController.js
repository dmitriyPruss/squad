const { Op } = require("sequelize");
const {
  Contest,
  Offer,
  Rating,
  Select,
  User,
} = require("../models/postgreModels");
const contestQueries = require("./queries/contestQueries");
const ServerError = require("../errors/ServerError");
const UtilFunctions = require("../utils/functions");
const CONSTANTS = require("./../constants");

module.exports.dataForContest = async (req, res, next) => {
  const response = {};

  try {
    const {
      body: { characteristic1, characteristic2 },
    } = req;

    const types = [characteristic1, characteristic2, "industry"].filter(
      Boolean
    );

    const characteristics = await Select.findAll({
      where: {
        type: {
          [Op.or]: types,
        },
      },
    });

    if (!characteristics) {
      return next(new ServerError());
    }

    characteristics.forEach((characteristic) => {
      const { type, describe } = characteristic;
      if (!response[type]) {
        response[type] = [];
      }
      response[type].push(describe);
    });

    res.status(201).send(response);
  } catch (err) {
    next(new ServerError("cannot get contest preferences"));
  }
};

module.exports.getContestById = async (req, res, next) => {
  const {
    params: { contestId },
    tokenData: { userId, role },
  } = req;

  try {
    let contestInfo = await Contest.findOne({
      where: { id: contestId },
      order: [[Offer, "id", "asc"]],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ["password", "role", "balance", "accessToken"],
          },
        },
        {
          model: Offer,
          required: false,
          where: role === CONSTANTS.CREATOR ? { userId } : {},
          attributes: { exclude: ["userId", "contestId"] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ["password", "role", "balance", "accessToken"],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId },
              attributes: { exclude: ["userId", "offerId"] },
            },
          ],
        },
      ],
    });

    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });

    res.status(200).send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    const {
      file: { filename, originalname },
    } = req;

    req.body.fileName = filename;
    req.body.originalFileName = originalname;
  }

  const {
    body: { contestId: id },
    tokenData: { userId },
  } = req;

  delete req.body.contestId;

  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id,
      userId,
    });

    res.status(200).send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  const {
    query: { limit, offset, contestStatus: status },
    tokenData: { userId },
  } = req;

  try {
    const contests = await Contest.findAll({
      where: { status, userId },
      limit,
      offset: offset === "undefined" ? 0 : offset,
      order: [["id", "DESC"]],
      include: [
        {
          model: Offer,
          required: false,
          attributes: ["id"],
        },
      ],
    });

    contests.forEach((contest) => {
      const {
        dataValues: { Offers },
      } = contest;

      contest.dataValues.count = Offers.length;
    });

    let haveMore = true;
    if (contests.length === 0) {
      haveMore = false;
    }

    res.status(200).send({ contests, haveMore });
  } catch (err) {
    return next(new ServerError(err));
  }
};

module.exports.getContests = async (req, res, next) => {
  const {
    query: {
      offset,
      limit,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries,
    },
    tokenData: { userId },
  } = req;

  const predicates = UtilFunctions.createWhereForAllContests(
    typeIndex,
    contestId,
    industry,
    awardSort
  );

  const { where, order } = predicates;

  try {
    const contests = await Contest.findAll({
      where,
      order,
      limit,
      offset: offset === "undefined" ? 0 : offset,
      include: [
        {
          model: Offer,
          required: ownEntries,
          where: ownEntries ? { userId } : {},
          attributes: ["id"],
        },
      ],
    });

    contests.forEach((contest) => {
      const {
        dataValues: { Offers },
      } = contest;

      contest.dataValues.count = Offers.length;
    });

    let haveMore = true;
    if (contests.length === 0) {
      haveMore = false;
    }

    res.status(200).send({ contests, haveMore });
  } catch (err) {
    return next(new ServerError());
  }
};

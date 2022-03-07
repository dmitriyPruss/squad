const queryString = require("query-string");
const {
  Contest,
  Offer,
  Rating,
  Select,
  User,
  sequelize,
} = require("../models/postgreModels");
const { Op } = require("sequelize");
const ServerError = require("../errors/ServerError");
const contestQueries = require("./queries/contestQueries");
const userQueries = require("./queries/userQueries");
const controller = require("../socketInit");
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
    res.send(response);
  } catch (err) {
    console.log(err);
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
          where: role === CONSTANTS.CREATOR.NAME ? { userId } : {},
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
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
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
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

// +
// GET OFFERS FOR MODERATOR!
module.exports.getOffersForModerator = async (req, res, next) => {
  const {
    tokenData: { userId },
    params: { page },
  } = req;

  try {
    let currentOffset;

    page === 1 ? (currentOffset = 0) : (currentOffset = 3 * (page - 1));

    let foundOffers = await contestQueries.offersForModerator(currentOffset);

    let isEndData = false;

    if (!foundOffers.length) {
      foundOffers = await contestQueries.offersForModerator(0);

      isEndData = true;
    }

    res.status(200).send({ foundOffers, isEndData });
  } catch (error) {
    next(error);
  }
};

// +
module.exports.getEmailMessages = async (req, res, next) => {
  const {
    tokenData: { userId, email },
    params: { page },
  } = req;

  const moderator = await User.findOne({
    where: {
      role: CONSTANTS.MODERATOR,
    },
    raw: true,
  });

  try {
    let currentOffset;

    page === 1 ? (currentOffset = 0) : (currentOffset = 3 * (page - 1));

    let messages = await contestQueries.messagesForCreator(
      userId,
      currentOffset,
      moderator
    );

    let isEndMessages = false;

    if (!messages.length) {
      isEndMessages = true;

      messages = await contestQueries.messagesForCreator(userId, 0, moderator);
    }

    res.status(200).send({ messages, isEndMessages });
  } catch (error) {
    next(error);
  }
};

// +
module.exports.directEmailBox = async (req, res, next) => {
  const {
    moderator: { role, firstName, lastName },
    status,
    contestId,
    id,
    userId,
    text,
  } = req.body;

  console.log("req.body", req.body);

  try {
    const emailLink = await contestQueries.createEmailLink(
      userId,
      contestId,
      text,
      status,
      role,
      firstName,
      lastName
    );

    console.log("emailLink", emailLink);

    res.status(201).send({ id, emailLink });
  } catch (error) {
    next(error);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};

  const {
    body: { contestId, customerId, offerData },
    tokenData: { userId },
  } = req;

  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = file.filename;
    obj.originalFileName = file.originalname;
  } else {
    obj.text = offerData;
  }

  obj.userId = userId;
  obj.contestId = contestId;

  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;

    controller.getNotificationController().emitEntryCreated(customerId);
    const User = Object.assign({}, req.tokenData, { id: userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS.REJECTED },
    { id: offerId }
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      "Someone of yours offers was rejected",
      contestId
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
        CONSTANTS.CONTEST.STATUS.FINISHED
      }'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONSTANTS.CONTEST.STATUS.ACTIVE
      }'
            ELSE '${CONSTANTS.CONTEST.STATUS.PENDING}'
            END
    `),
    },
    { orderId },
    transaction
  );

  await userQueries.updateUser(
    { balance: sequelize.literal("balance + " + finishedContest.prize) },
    creatorId,
    transaction
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS.WON}'
            ELSE '${CONSTANTS.OFFER_STATUS.REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction
  );
  transaction.commit();

  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS.REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      "Someone of yours offers was rejected",
      contestId
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, "Someone of your offers WIN", contestId);
  return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;

  const { command, offerId, orderId, creatorId, contestId, priority } =
    req.body;

  console.log("req", command, offerId, orderId, creatorId, contestId, priority);

  if (command === "reject") {
    try {
      const offer = await rejectOffer(offerId, creatorId, contestId);

      console.log("reject offer", offer);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (command === "resolve") {
    try {
      transaction = await sequelize.transaction();
      const winningOffer = await resolveOffer(
        contestId,
        creatorId,
        orderId,
        offerId,
        priority,
        transaction
      );

      console.log("resolve winningOffer", winningOffer);

      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  // console.log(`req`, req.tokenData);
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

    // console.log(`contests`, contests);

    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );
    let haveMore = true;
    if (contests.length === 0) {
      haveMore = false;
    }
    res.send({ contests, haveMore });
  } catch (err) {
    return next(new ServerError(err));
  }
};

module.exports.getContests = async (req, res, next) => {
  // console.log(`req`, req);

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

    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );
    let haveMore = true;
    if (contests.length === 0) {
      haveMore = false;
    }
    res.send({ contests, haveMore });
  } catch (err) {
    // next(new ServerError());
    return next(new ServerError());
  }
};

const { User, sequelize } = require("../models/postgreModels");
const ServerError = require("../errors/ServerError");
const contestQueries = require("./queries/contestQueries");
const { resolveOffer, rejectOffer } = require("./queries/offerQueries");
const controller = require("../socketInit");
const CONSTANTS = require("./../constants");

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;

  const { command, offerId, orderId, creatorId, contestId, priority } =
    req.body;

  if (command === "reject") {
    try {
      const offer = await rejectOffer(offerId, creatorId, contestId);
      res.status(201).send(offer);
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

      res.status(201).send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};

  const {
    body: { contestId, customerId, offerData },
    tokenData: { userId },
    file,
  } = req;

  if (req.body.contestType === CONSTANTS.CONTEST.LOGO) {
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

    res.status(201).send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

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

module.exports.directEmailBox = async (req, res, next) => {
  const {
    moderator: { role, firstName, lastName },
    status,
    contestId,
    id,
    userId,
    text,
  } = req.body;

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

    res.status(201).send({ id, emailLink });
  } catch (error) {
    next(error);
  }
};

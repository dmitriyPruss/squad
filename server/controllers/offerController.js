const { sequelize, User } = require("../models/postgreModels");
const ServerError = require("../errors/ServerError");
const contestQueries = require("./queries/contestQueries");
const userQueries = require("./queries/userQueries");
const { resolveOffer, rejectOffer } = require("./queries/offerQueries");
const { getNotificationController } = require("../socketInit");
const { CONTEST, MODERATOR, ITEMS_ON_PAGE } = require("./../constants");

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;

  const {
    tokenData: { userId },
    body: { command, offerId, orderId, creatorId, contestId, priority },
  } = req;

  if (command === "reject") {
    try {
      const offer = await rejectOffer(offerId, creatorId, contestId, userId);
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
        userId,
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
    body: { contestId, offerData },
    tokenData: { userId },
    file,
  } = req;

  if (req.body.contestType === CONTEST.LOGO) {
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

    const user = Object.assign({}, req.tokenData, { id: userId });

    const moderators = await User.findAll({
      where: { role: MODERATOR },
      raw: true,
    });

    if (moderators.length) {
      const moderatorRoom = moderators
        .map((moderator) => moderator.id)
        .sort((current, next) => current - next);

      const { firstName, lastName, role, avatar } = await userQueries.findUser({
        id: userId,
      });

      getNotificationController().emitNewOffer(moderatorRoom, {
        firstName,
        lastName,
        role,
        avatar,
      });
    }

    res.status(201).send(Object.assign({}, result, { User: user }));
  } catch (e) {
    return next(new ServerError());
  }
};

module.exports.getOffersForModerator = async (req, res, next) => {
  const {
    params: { page },
  } = req;

  try {
    let currentOffset;

    page === 1
      ? (currentOffset = 0)
      : (currentOffset = ITEMS_ON_PAGE * (page - 1));

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
    tokenData: { userId },
    params: { page },
  } = req;

  const moderator = await User.findOne({
    where: {
      role: MODERATOR,
    },
    raw: true,
  });

  try {
    let currentOffset;

    page === 1
      ? (currentOffset = 0)
      : (currentOffset = ITEMS_ON_PAGE * (page - 1));

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

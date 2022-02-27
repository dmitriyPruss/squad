const queryString = require("query-string");
const nodemailer = require("nodemailer");
const { Contest, Offer, Rating, Select, User, sequelize } = require("../models/postgreModels");
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

    const types = [characteristic1, characteristic2, "industry"].filter(Boolean);

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

  // console.log(`req.headers`, req.params);

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

// CHECK NEW OFFER!
module.exports.checkNewOffer = async (req, res, next) => {
  const {
    tokenData: { userId },
    params: { page },
  } = req;

  console.log("userId", userId);
  console.log("page", typeof page);
  console.log("page", page);

  let currentOffset;

  page === 1 ? (currentOffset = 0) : (currentOffset = 3 * (page - 1));

  console.log("checkNewOffer req.body", req.body);

  let foundOffers = await Offer.findAll({
    where: {status: CONSTANTS.CONTEST.STATUS.PENDING},
    raw: true,
    limit: 3,
    order: [["id"]],
    offset: currentOffset,
    include: [
      {
        model: User,
        raw: true,
        attributes: ["id", "avatar", "firstName", "lastName", "displayName", "email", "rating"],
      },
      {
        model: Contest,
        attributes: [
          "orderId",
          "contestType",
          "title",
          "typeOfName",
          "styleName",
          "focusOfWork",
          "targetCustomer",
          "industry",
          "priority"
        ],
      },
    ],
  });

  let isEndData = false;

  console.log("foundOffers", foundOffers);
  console.log('isEndData', isEndData);

  if (!foundOffers.length) {
    foundOffers = await Offer.findAll({
      where: {status: CONSTANTS.CONTEST.STATUS.PENDING},
      raw: true,
      limit: 3,
      order: [["id"]],
      offset: 0,
      include: [
        {
          model: User,
          raw: true,
          attributes: ["id", "avatar", "firstName", "lastName", "displayName", "email", "rating"],
        },
        {
          model: Contest,
          attributes: [
            "orderId",
            "contestType",
            "title",
            "typeOfName",
            "styleName",
            "focusOfWork",
            "targetCustomer",
            "industry",
            "priority"
          ],
        },
      ],
    });

    isEndData = true;
  }

  res.send({foundOffers, isEndData});
};


module.exports.checkOfferEmail = async (req, res, next) => {
  const {
    body: { "User.email": userEmail, text, "Contest.title": contestTitle },
    tokenData: { email, firstName, lastName, role },
  } = req;

  // email
  const myTestAccount = await nodemailer.createTestAccount();

  const transportOptions = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: myTestAccount.user,
      pass: myTestAccount.pass,
    },
  };

  const sendMailOptions = {
    from: email,
    to: `${userEmail}`,
    subject: `Moderator's permission - ${role} ${firstName} ${lastName}`,
    text: `Your offer ${contestTitle} is resolved. Details: ${JSON.stringify(req.body, null, 2)}`,
  };

  const transporter = nodemailer.createTransport(transportOptions);

  const info = await transporter.sendMail(sendMailOptions);

  const emailLink = nodemailer.getTestMessageUrl(info);
  // email

  const emailMessage = {
    text,
    moderator: {
      role,
      fullName: `${firstName} ${lastName}`,
    },
    emailLink,
    contestTitle,
    confirm: true,
  };

  res.send(emailMessage);
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

  console.log("moderator", moderator);

  let currentOffset;

  page === 1 ? (currentOffset = 0) : (currentOffset = 3 * (page - 1));

  let offers = await Offer.findAll({
    where: {
      userId,
      status: {
        [Op.or]: [CONSTANTS.OFFER_STATUS.REJECTED, CONSTANTS.OFFER_STATUS.WON]
      }
    },
    limit: 3,
    order: [["id", "DESC"]],
    offset: currentOffset,
    raw: true,
  }).then((results) => {
    const offerData = [];

    for (const result of results) {

      result.moderator = {
        firstName: moderator.firstName,
        lastName: moderator.lastName,
        role: moderator.role,
      };

      result.email = null;

      offerData.push(result);
    }

    return offerData;
  });

  let isEndMessages = false;

  if(!offers.length) {
    isEndMessages = true;

    offers = await Offer.findAll({
      where: {
        userId,
      },
      limit: 3,
      order: [["id", "DESC"]],
      offset: 0,
      raw: true,
    }).then((results) => {
      console.log("results", results);
      const offerData = [];
  
      for (const result of results) {
  
        result.moderator = {
          firstName: moderator.firstName,
          lastName: moderator.lastName,
          role: moderator.role,
        };
  
        result.email = null;
  
        offerData.push(result);
      }
  
      return offerData;
    });
  };

  console.log("sendedOffers", offers);

  res.send({offers, isEndMessages});
};

module.exports.directEmailBox = async (req, res, next) => {
  console.log("req.body", req.body);

  const {
    moderator: {
      role, firstName, lastName
    }, status, contestId
  } = req.body;

  const moderator = await User.findOne({
    where: {
      role: CONSTANTS.MODERATOR,
    },
    raw: true,
  });

  const creator = await User.findOne({
    where: {
      id: req.body.userId,
    },
    raw: true,
  });

  console.log("creator", creator);

  const offerDetails = await Contest.findOne({
    where: {
      id: contestId
    },
    attributes: {
      exclude: ['id', 'orderId', 'userId'],
    },
    include: {
      model: Offer,
      attributes: ['status']
    },
    raw: true
  })

  const myTestAccount = await nodemailer.createTestAccount();

  const transportOptions = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: myTestAccount.user,
      pass: myTestAccount.pass,
    },
  };

  const transporter = nodemailer.createTransport(transportOptions);

  const sendMailOptions = {
    from: moderator.email,
    to: creator.email,
    subject: `Moderator's permission`,
    text: `Your offer ${req.body.text} is ${status === CONSTANTS.OFFER_STATUS.REJECTED ? CONSTANTS.OFFER_STATUS.REJECTED : CONSTANTS.OFFER_STATUS.WON} by ${role} ${firstName} ${lastName}. Details: ${JSON.stringify(offerDetails, null, 2)}`,
  };

  const info = await transporter.sendMail(sendMailOptions);

  const emailLink = nodemailer.getTestMessageUrl(info);

  res.send({ id: req.body.id, emailLink });
};

module.exports.changeOfferStatus = async (req, res, next) => {
  console.log("req.body", req.body);

  res.send(req.body);
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};

  const {
    body: { contestId, customerId, offerData },
    tokenData: { userId },
  } = req;

  console.log("setNewOffer req.body", req.body);

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
    .emitChangeOfferStatus(creatorId, "Someone of yours offers was rejected", contestId);
  return rejectedOffer;
};

const resolveOffer = async (contestId, creatorId, orderId, offerId, priority, transaction) => {
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
    if (offer.status === CONSTANTS.OFFER_STATUS.REJECTED && creatorId !== offer.userId) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(arrayRoomsId, "Someone of yours offers was rejected", contestId);
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, "Someone of your offers WIN", contestId);
  return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;

  const { command, offerId, orderId, creatorId, contestId, priority } = req.body;

  console.log("req", command, offerId, orderId, creatorId, contestId, priority);

  if (command === "reject") {
    try {
      const offer = await rejectOffer(offerId, creatorId, contestId);

      console.log('reject offer', offer)
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

      console.log('resolve winningOffer', winningOffer)

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

    contests.forEach((contest) => (contest.dataValues.count = contest.dataValues.Offers.length));
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
    query: { offset, limit, typeIndex, contestId, industry, awardSort, ownEntries },
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

    contests.forEach((contest) => (contest.dataValues.count = contest.dataValues.Offers.length));
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

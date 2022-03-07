const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const { Contest, User, Offer } = require("../../models/postgreModels");
const CONSTANTS = require("./../../constants");
const ServerError = require("../../errors/ServerError");

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updatedCount !== 1) {
    throw new ServerError("cannot update Contest");
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  if (updatedCount < 1) {
    throw new ServerError("cannot update Contest");
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateOffer = async (data, predicate, transaction) => {
  const [updatedCount, [updatedOffer]] = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError("cannot update offer!");
  } else {
    return updatedOffer.dataValues;
  }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
  const [updatedCount, updatedOffer] = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount < 1) {
    throw new ServerError("cannot update offer!");
  } else {
    return updatedOffer;
  }
};

module.exports.createOffer = async (data) => {
  const result = await Offer.create(data);
  if (!result) {
    throw new ServerError("cannot create new Offer");
  } else {
    return result.get({ plain: true });
  }
};

module.exports.offersForModerator = async (currentOffset) => {
  const offers = await Offer.findAll({
    where: { status: CONSTANTS.CONTEST.STATUS.PENDING },
    raw: true,
    limit: 3,
    order: [["id"]],
    offset: currentOffset,
    include: [
      {
        model: User,
        raw: true,
        attributes: [
          "id",
          "avatar",
          "firstName",
          "lastName",
          "displayName",
          "email",
          "rating",
        ],
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
          "priority",
        ],
      },
    ],
  });

  return offers;
};

module.exports.messagesForCreator = async (
  userId,
  currentOffset,
  moderator
) => {
  const messages = await Offer.findAll({
    where: {
      userId,
      status: {
        [Op.or]: [CONSTANTS.OFFER_STATUS.REJECTED, CONSTANTS.OFFER_STATUS.WON],
      },
    },
    limit: 3,
    order: [["id", "DESC"]],
    offset: currentOffset,
    raw: true,
  }).then((results) => {
    const offerData = [];

    for (const result of results) {
      const { firstName, lastName, role } = moderator;

      result.moderator = {
        firstName,
        lastName,
        role,
      };

      result.email = null;

      offerData.push(result);
    }

    return offerData;
  });

  return messages;
};

module.exports.createEmailLink = async (
  userId,
  contestId,
  text,
  status,
  role,
  firstName,
  lastName
) => {
  const moderator = await User.findOne({
    where: {
      role: CONSTANTS.MODERATOR,
    },
    raw: true,
  });

  // console.log("moderator", moderator);

  const creator = await User.findOne({
    where: {
      id: userId,
    },
    raw: true,
  });

  // console.log("creator", creator);

  const offerDetails = await Contest.findOne({
    where: {
      id: contestId,
    },
    attributes: {
      exclude: ["id", "orderId", "userId"],
    },
    include: {
      model: Offer,
      attributes: ["status"],
    },
    raw: true,
  });

  // console.log("offerDetails", offerDetails);

  const myTestAccount = await nodemailer.createTestAccount();

  // console.log("myTestAccount", myTestAccount);

  const transportOptions = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: myTestAccount.user,
      pass: myTestAccount.pass,
    },
  };

  // console.log("transportOptions", transportOptions);

  const transporter = nodemailer.createTransport(transportOptions);

  console.log("transporter", transporter);

  const sendMailOptions = {
    from: moderator.email,
    to: creator.email,
    subject: `Moderator's permission`,
    text: `Your offer ${text} is ${
      status === CONSTANTS.OFFER_STATUS.REJECTED
        ? CONSTANTS.OFFER_STATUS.REJECTED
        : CONSTANTS.OFFER_STATUS.WON
    } by ${role} ${firstName} ${lastName}. Details: ${JSON.stringify(
      offerDetails,
      null,
      2
    )}`,
  };

  // console.log("sendMailOptions", sendMailOptions);

  const info = await transporter.sendMail(sendMailOptions);

  console.log("Message sent: %s", info.messageId);

  const link = nodemailer.getTestMessageUrl(info);

  return link;
};

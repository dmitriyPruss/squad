const jwt = require("jsonwebtoken");
const moment = require("moment");
const { v4: uuid } = require("uuid");
const CONSTANTS = require("./../constants");
const {
  Contest,
  Rating,
  Offer,
  Transaction,
  User,
  sequelize,
  Sequelize,
} = require("../models/postgreModels");
const { Op } = require("sequelize");
const NotUniqueEmail = require("../errors/NotUniqueEmail");
const { getNotificationController } = require("../socketInit");
const userQueries = require("./queries/userQueries");
const bankQueries = require("./queries/bankQueries");
const ratingQueries = require("./queries/ratingQueries");

module.exports.login = async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  try {
    const foundUser = await userQueries.findUser({ email });

    const {
      firstName,
      id,
      role,
      lastName,
      avatar,
      displayName,
      balance,
      email: userEmail,
      rating,
      password: userPassword,
    } = foundUser;

    await userQueries.passwordCompare(password, userPassword);
    const accessToken = jwt.sign(
      {
        firstName,
        userId: id,
        role,
        lastName,
        avatar,
        displayName,
        balance,
        email: userEmail,
        rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
    );

    await userQueries.updateUser({ accessToken }, id);
    res.status(200).send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports.registration = async (req, res, next) => {
  try {
    const newUser = await userQueries.userCreation(
      Object.assign(req.body, { password: req.hashPass })
    );

    const {
      firstName,
      id,
      role,
      lastName,
      avatar,
      displayName,
      balance,
      email,
      rating,
    } = newUser;

    const accessToken = jwt.sign(
      {
        firstName,
        userId: id,
        role,
        lastName,
        avatar,
        displayName,
        balance,
        email,
        rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
    );
    await userQueries.updateUser({ accessToken }, id);
    res.status(201).send({ token: accessToken });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

function getQuery(offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () =>
    ratingQueries.createRating(
      {
        offerId,
        mark,
        userId,
      },
      transaction
    );
  const getUpdateQuery = () =>
    ratingQueries.updateRating({ mark }, { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  let transaction;

  const {
    body: { isFirst, offerId, mark, creatorId },
    tokenData: { userId },
  } = req;

  try {
    transaction = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offers = await Rating.findAll({
      include: [
        {
          model: Offer,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });

    const sum = offers.reduce((sum, offer) => sum + offer.dataValues.mark, 0);

    const avg = sum / offers.length || 0;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();

    const { firstName, lastName, role, avatar } = await userQueries.findUser({
      id: userId,
    });

    getNotificationController().emitChangeMark(creatorId, {
      firstName,
      lastName,
      role,
      avatar,
    });
    res.status(200).send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  let transaction;

  const {
    body: { contests, cvc, expiry, number, price },
    tokenData: { userId },
  } = req;

  try {
    transaction = await sequelize.transaction();
    await bankQueries.updateBankBalance(
      {
        balance: sequelize.literal(`
                CASE
            WHEN "cardNumber"='${number.replace(
              / /g,
              ""
            )}' AND "cvc"='${cvc}' AND "expiry"='${expiry}'
                THEN "balance"-${price}
            WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK.NUMBER}' AND "cvc"='${
          CONSTANTS.SQUADHELP_BANK.CVC
        }' AND "expiry"='${CONSTANTS.SQUADHELP_BANK.EXPIRY}'
                THEN "balance"+${price} END
        `),
      },
      {
        cardNumber: {
          [Op.in]: [CONSTANTS.SQUADHELP_BANK.NUMBER, number.replace(/ /g, "")],
        },
      },
      transaction
    );

    const orderId = uuid();

    contests.forEach((contest, index) => {
      const prize =
        index === contests.length - 1
          ? Math.ceil(price / contests.length)
          : Math.floor(price / contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? "active" : "pending",
        userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format("YYYY-MM-DD HH:mm"),
        prize,
      });
    });
    await Contest.bulkCreate(contests, transaction);
    transaction.commit();

    const creators = await User.findAll({
      where: { role: CONSTANTS.CREATOR.NAME },
      raw: true,
    });

    if (creators.length) {
      const creatorRoom = creators
        .map((creator) => creator.id)
        .sort((current, next) => current - next);

      const { firstName, lastName, role, avatar } = await userQueries.findUser({
        id: userId,
      });

      getNotificationController().emitNewContest(creatorRoom, {
        firstName,
        lastName,
        role,
        avatar,
      });
    }

    res.status(204).send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const {
    body,
    file,
    tokenData: { userId },
  } = req;

  try {
    if (file) {
      req.body.avatar = file.filename;
    }
    const updatedUser = await userQueries.updateUser(body, userId);

    const {
      firstName,
      lastName,
      displayName,
      avatar,
      email,
      balance,
      role,
      id,
    } = updatedUser;

    res.status(200).send({
      firstName,
      lastName,
      displayName,
      avatar,
      email,
      balance,
      role,
      id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;

  const {
    body: { cvc, expiry, number, sum },
    tokenData: { userId },
  } = req;

  try {
    transaction = await sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: sequelize.literal("balance - " + sum) },
      userId,
      transaction
    );

    await bankQueries.updateBankBalance(
      {
        balance: sequelize.literal(`CASE 
                WHEN "cardNumber"='${number.replace(
                  / /g,
                  ""
                )}' AND "expiry"='${expiry}' AND "cvc"='${cvc}'
                    THEN "balance"+${sum}
                WHEN "cardNumber"='${
                  CONSTANTS.SQUADHELP_BANK.NUMBER
                }' AND "expiry"='${
          CONSTANTS.SQUADHELP_BANK.EXPIRY
        }' AND "cvc"='${CONSTANTS.SQUADHELP_BANK.CVC}'
                    THEN "balance"-${sum}
                 END
                `),
      },
      {
        cardNumber: {
          [Op.in]: [CONSTANTS.SQUADHELP_BANK.NUMBER, number.replace(/ /g, "")],
        },
      },
      transaction
    );

    const newTransactionInfo = {
      operationType: CONSTANTS.TRANSACTION_OPERATION_TYPES.INCOME,
      amount: sum,
      userId,
    };

    await Transaction.create(newTransactionInfo, { transaction });

    transaction.commit();
    res.status(201).send({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.getUserTransactions = async (req, res, next) => {
  const {
    tokenData: { userId },
  } = req;

  try {
    const foundTransactions = await Transaction.findAll({
      where: { userId },
      raw: true,
      attributes: { exclude: ["updatedAt", "userId"] },
    });

    res.status(200).send(foundTransactions);
  } catch (err) {
    next(new ServerError());
  }
};

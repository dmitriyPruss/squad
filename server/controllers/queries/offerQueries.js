const { sequelize } = require("./../../models/postgreModels");
const contestQueries = require("./contestQueries");
const userQueries = require("./userQueries");
const controller = require("./../../socketInit");
const CONSTANTS = require("./../../constants");

module.exports.rejectOffer = async (offerId, creatorId, contestId) => {
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

module.exports.resolveOffer = async (
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

  console.log("updatedOffers", updatedOffers);

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

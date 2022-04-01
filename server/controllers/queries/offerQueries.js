const { sequelize } = require("./../../models/postgreModels");
const contestQueries = require("./contestQueries");
const userQueries = require("./userQueries");
const { getNotificationController } = require("./../../socketInit");
const { CONTEST, OFFER_STATUS } = require("./../../constants");

module.exports.rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: OFFER_STATUS.REJECTED },
    { id: offerId }
  );

  getNotificationController().emitChangeOfferStatus(
    creatorId,
    "Some of your offers were rejected",
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
        CONTEST.STATUS.FINISHED
      }'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONTEST.STATUS.ACTIVE
      }'
            ELSE '${CONTEST.STATUS.PENDING}'
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
            WHEN "id"=${offerId} THEN '${OFFER_STATUS.WON}'
            ELSE '${OFFER_STATUS.REJECTED}'
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
    if (offer.status === OFFER_STATUS.REJECTED && creatorId !== offer.userId) {
      arrayRoomsId.push(offer.userId);
    }
  });

  if (arrayRoomsId.length) {
    getNotificationController().emitChangeOfferStatus(
      arrayRoomsId,
      "Some of your offers were rejected",
      contestId
    );
  }

  getNotificationController().emitChangeOfferStatus(
    creatorId,
    "Some of your offers have won",
    contestId
  );
  return updatedOffers[0].dataValues;
};

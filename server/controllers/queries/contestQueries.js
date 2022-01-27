const { Contest, Offer } = require('../../models/postgreModels');
const ServerError = require('../../errors/ServerError');

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction
  });
  if (updatedCount < 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateOffer = async (data, predicate, transaction) => {
  const [updatedCount, [updatedOffer]] = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update offer!');
  } else {
    return updatedOffer.dataValues;
  }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
  const [updatedCount, updatedOffer] = await Offer.update(data, {
    where: predicate,
    returning: true,
    transaction
  });
  if (updatedCount < 1) {
    throw new ServerError('cannot update offer!');
  } else {
    return updatedOffer;
  }
};

module.exports.createOffer = async data => {
  const result = await Offer.create(data);
  if (!result) {
    throw new ServerError('cannot create new Offer');
  } else {
    return result.get({ plain: true });
  }
};

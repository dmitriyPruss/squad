const { Rating } = require("../../models/postgreModels");
const ServerError = require("../../errors/ServerError");

module.exports.updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await Rating.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });

  console.log("updatedRating.dataValues", updatedRating.dataValues);

  if (updatedCount !== 1) {
    throw new ServerError("cannot update mark on this offer");
  }
  return updatedRating.dataValues;
};

module.exports.createRating = async (data, transaction) => {
  console.log("data", data);

  const result = await Rating.create(data, { transaction });

  console.log("createRating result", result);

  if (!result) {
    throw new ServerError("cannot mark offer");
  } else {
    return result.get({ plain: true });
  }
};

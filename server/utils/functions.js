const { Op } = require("sequelize");
const CONSTANTS = require("../constants");

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort
) => {
  const object = {
    where: {},
    order: [],
  };
  if (typeIndex) {
    Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(object.where, { id: contestId });
  }
  if (industry) {
    Object.assign(object.where, { industry });
  }
  if (awardSort) {
    object.order.push(["prize", awardSort]);
  }
  Object.assign(object.where, {
    status: {
      [Op.or]: [
        CONSTANTS.CONTEST.STATUS.FINISHED,
        CONSTANTS.CONTEST.STATUS.ACTIVE,
      ],
    },
  });
  object.order.push(["id", "desc"]);
  return object;
};

function getPredicateTypes(index) {
  return { [Op.or]: [types[index].split(",")] };
}

const types = [
  "",
  "name,tagline,logo",
  "name",
  "tagline",
  "logo",
  "name,tagline",
  "logo,tagline",
  "name,logo",
];

module.exports.mapStringToValues = (val) => {
  switch (val) {
    case "true":
      return true;
    case "false":
      return false;
    case "null":
      return null;
    case "undefined":
      return undefined;
    default:
      return val;
  }
};

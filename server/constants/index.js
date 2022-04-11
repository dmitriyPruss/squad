const CONSTANTS = {
  JWT_SECRET: "asdasdasd4as5d4as8d7a8sd4as65d4a8sd7asd4as56d4",
  ACCESS_TOKEN_TIME: "1h",
  SALT_ROUNDS: 5,
  SQUADHELP_BANK: {
    NUMBER: "4564654564564564",
    NAME: "SquadHelp",
    CVC: "453",
    EXPIRY: "11/22",
  },
  CUSTOMER: "customer",
  CREATOR: "creator",
  MODERATOR: "moderator",
  CONTEST: {
    NAME: "name",
    LOGO: "logo",
    TAGLINE: "tagline",
    STATUS: {
      ACTIVE: "active",
      FINISHED: "finished",
      PENDING: "pending",
    },
  },
  CONTESTS_DEFAULT_DIR: "public/contestFiles/",
  OFFER_STATUS: {
    PENDING: "pending",
    REJECTED: "rejected",
    WON: "won",
  },
  SOCKET: {
    CONNECTION: "connection",
    SUBSCRIBE_CHAT: "subscribeChat",
    UNSUBSCRIBE_CHAT: "unsubscribeChat",
  },
  NOTIFICATION: {
    SUBSCRIBE: "subscribe",
    UNSUBSCRIBE: "unsubscribe",
    NEW_CONTEST: "newContest",
    NEW_OFFER: "newOffer",
    CHANGE: {
      MARK: "changeMark",
      OFFER_STATUS: "changeOfferStatus",
    },
  },
  NEW_MESSAGE: "newMessage",
  CHANGE_BLOCK_STATUS: "CHANGE_BLOCK_STATUS",
  TRANSACTION_OPERATION_TYPES: {
    INCOME: "INCOME",
    EXPENSE: "EXPENSE",
  },
  ITEMS_ON_PAGE: 3,
  FILES_PATH: "public/",
};

module.exports = CONSTANTS;

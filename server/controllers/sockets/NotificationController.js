const WebSocket = require("./WebSocket");
const {
  NOTIFICATION: { ENTRY_CREATED, CHANGE },
} = require("../../constants");

class NotificationController extends WebSocket {
  emitEntryCreated(target) {
    this.io.to(target).emit(ENTRY_CREATED);
  }

  emitChangeMark(target) {
    this.io.to(target).emit(CHANGE.MARK);
  }

  emitChangeOfferStatus(target, message, contestId) {
    this.io.to(target).emit(CHANGE.OFFER_STATUS, { message, contestId });
  }
}

module.exports = NotificationController;

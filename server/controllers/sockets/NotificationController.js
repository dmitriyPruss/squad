const WebSocket = require("./WebSocket");
const {
  NOTIFICATION: { CHANGE, NEW_CONTEST, NEW_OFFER, SUBSCRIBE, UNSUBSCRIBE },
} = require("../../constants");

class NotificationController extends WebSocket {
  anotherSubscribes(socket) {
    this.onUnsubscribeNotification(socket);
    this.onSubscribeNotification(socket);
  }

  onSubscribeNotification(socket) {
    socket.on(SUBSCRIBE, (id) => {
      socket.join(id);
    });
  }

  onUnsubscribeNotification(socket) {
    socket.on(UNSUBSCRIBE, (id) => {
      socket.leave(id);
    });
  }

  emitChangeMark(target, data) {
    this.io.to(target).emit(CHANGE.MARK, data);
  }

  emitChangeOfferStatus(target, message, contestId, data) {
    this.io.to(target).emit(CHANGE.OFFER_STATUS, { message, contestId, data });
  }

  emitNewContest(target, data) {
    this.io.to(target).emit(NEW_CONTEST, data);
  }

  emitNewOffer(target, data) {
    this.io.to(target).emit(NEW_OFFER, data);
  }
}

module.exports = NotificationController;

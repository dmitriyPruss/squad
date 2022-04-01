import React from "react";
import { toast } from "react-toastify";
import WebSocket from "./WebSocket";
import Notification from "../../../components/Notification";
import CONSTANTS from "../../../constants";

const {
  NOTIFICATION: { ENTRY_CREATED, CHANGE, SUBSCRIBE, UNSUBSCRIBE },
} = CONSTANTS.SOCKET;

class NotificationSocket extends WebSocket {
  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onChangeMark();
    this.onChangeOfferStatus();
    this.onNewContest();
    this.onNewOffer();
  };

  onChangeMark = () => {
    this.socket.on(CHANGE.MARK, () => {
      toast("Someone liked your offer");
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on(CHANGE.OFFER_STATUS, (message) => {
      const { message: mes, contestId } = message;

      toast(<Notification message={mes} contestId={contestId} />);
    });
  };

  onNewContest = () => {
    this.socket.on("newContest", () => {
      toast("Received a new contest. Please update the data...");
    });
  };

  onNewOffer = () => {
    this.socket.on("newOffer", () => {
      toast("Received a new offer. Please update the data...");
    });
  };

  subscribe = (id) => {
    this.socket.emit(SUBSCRIBE, id);
  };

  unsubscribe = (id) => {
    this.socket.emit(UNSUBSCRIBE, id);
  };
}

export default NotificationSocket;

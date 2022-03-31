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
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
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

  onEntryCreated = () => {
    this.socket.on(ENTRY_CREATED, () => {
      toast("New Entry");
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

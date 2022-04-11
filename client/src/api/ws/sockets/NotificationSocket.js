import React from "react";
import { toast } from "react-toastify";
import WebSocket from "./WebSocket";
import OfferStatusNotification from "../../../components/Notifications/OfferStatusNotification";
import NewNotification from "../../../components/Notifications/NewNotification";
import ChangeMarkNotification from "../../../components/Notifications/ChangeMarkNotification";
import CONSTANTS from "../../../constants";

const {
  NOTIFICATION: { CHANGE, NEW_CONTEST, NEW_OFFER, SUBSCRIBE, UNSUBSCRIBE },
} = CONSTANTS.SOCKET;

class NotificationSocket extends WebSocket {
  anotherSubscribes = () => {
    this.onChangeMark();
    this.onChangeOfferStatus();
    this.onNewContest();
    this.onNewOffer();
  };

  onChangeMark = () => {
    this.socket.on(CHANGE.MARK, (data) => {
      toast(<ChangeMarkNotification data={data} />);
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on(CHANGE.OFFER_STATUS, (message) => {
      const { message: mes, contestId, data } = message;

      toast(
        <OfferStatusNotification
          message={mes}
          contestId={contestId}
          data={data}
        />
      );
    });
  };

  onNewContest = () => {
    this.socket.on(NEW_CONTEST, (data) => {
      toast(<NewNotification data={data} />);
    });
  };

  onNewOffer = () => {
    this.socket.on(NEW_OFFER, (data) => {
      toast(<NewNotification data={data} />);
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

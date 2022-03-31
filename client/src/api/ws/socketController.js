import ChatSocket from "./sockets/ChatSocket";
import NotificationSocket from "./sockets/NotificationSocket";
import CONSTANTS from "../../constants";

const { CHAT, NOTIFICATION } = CONSTANTS.SOCKET;

export let controller;
export let chatController;

export const initSocket = (store) => {
  const { dispatch, getState } = store;

  controller = new NotificationSocket(dispatch, getState, NOTIFICATION.ROOM);
  chatController = new ChatSocket(dispatch, getState, CHAT.ROOM);
  return store;
};

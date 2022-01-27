import ChatSocket from './sockets/ChatSocket';
import NotificationSocket from './sockets/NotificationSocket';

export let controller;
export let chatController;

export const initSocket = store => {
  const { dispatch, getState } = store;

  controller = new NotificationSocket(dispatch, getState, 'notifications');
  chatController = new ChatSocket(dispatch, getState, 'chat');
  return store;
};

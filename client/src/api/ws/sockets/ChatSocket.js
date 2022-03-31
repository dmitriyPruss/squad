import isEqual from "lodash/isEqual";
import WebSocket from "./WebSocket";
import CONSTANTS from "../../../constants";
import {
  addMessage,
  changeBlockStatusInStore,
} from "../../../actions/actionCreator";

const {
  CHAT: { CHANGE_BLOCK_STATUS, NEW_MESSAGE, SUBSCRIBE_CHAT, UNSUBSCRIBE_CHAT },
} = CONSTANTS.SOCKET;

class ChatSocket extends WebSocket {
  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CHANGE_BLOCK_STATUS, (data) => {
      const { message } = data;
      const { messagesPreview } = this.getState().chatStore;

      messagesPreview.forEach((preview) => {
        if (isEqual(preview.participants, message.participants)) {
          preview.blackList = message.blackList;
        }
      });
      this.dispatch(
        changeBlockStatusInStore({ chatData: message, messagesPreview })
      );
    });
  };

  onNewMessage = () => {
    this.socket.on(NEW_MESSAGE, (data) => {
      const {
        message: {
          message,
          preview,
          message: { body, createdAt, sender, participants },
        },
      } = data;
      const { messagesPreview } = this.getState().chatStore;

      let isNew = true;
      messagesPreview.forEach((msgPreview) => {
        if (isEqual(msgPreview.participants, participants)) {
          isNew = false;

          msgPreview.text = body;
          msgPreview.sender = sender;
          msgPreview.createAt = createdAt;
        }
      });
      if (isNew) {
        messagesPreview.push(preview);
      }

      this.dispatch(addMessage({ message, messagesPreview }));
    });
  };

  subscribeChat = (id) => {
    this.socket.emit(SUBSCRIBE_CHAT, id);
  };

  unsubscribeChat = (id) => {
    this.socket.emit(UNSUBSCRIBE_CHAT, id);
  };
}

export default ChatSocket;

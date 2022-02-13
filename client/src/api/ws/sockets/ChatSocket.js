import isEqual from 'lodash/isEqual';
import WebSocket from './WebSocket';
import CONTANTS from '../../../constants';
import {
  addMessage,
  changeBlockStatusInStore
} from '../../../actions/actionCreator';

class ChatSocket extends WebSocket {
  constructor (dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONTANTS.CHANGE_BLOCK_STATUS, data => {
      const { message } = data;
      const { messagesPreview } = this.getState().chatStore;
      messagesPreview.forEach(preview => {
        if (isEqual(preview.participants, message.participants))
          preview.blackList = message.blackList;
      });
      this.dispatch(
        changeBlockStatusInStore({ chatData: message, messagesPreview })
      );
    });
  };

  onNewMessage = () => {
    this.socket.on('newMessage', data => {
      // const { message, preview } = data.message;

      const {
        message,
        message: { body, createdAt, sender },
        preview
      } = data;
      const { messagesPreview } = this.getState().chatStore;

      console.log('onNewMessage');
      console.log('data', data);
      console.log('data.message', data.message);
      console.log('messagesPreview', messagesPreview);
      console.log('preview', preview);
      console.log('onNewMessage');

      let isNew = true;
      messagesPreview.forEach(preview => {
        console.log('PARTICIPANTS preview', preview);
        if (isEqual(preview.participants, data.message.participants)) {
          preview.text = body;
          preview.sender = sender;
          preview.createAt = createdAt;
          isNew = false;
        }
      });
      if (isNew) {
        messagesPreview.push(preview);
      }
      this.dispatch(addMessage({ message, messagesPreview }));
    });
  };

  subscribeChat = id => {
    this.socket.emit('subscribeChat', id);
  };

  unsubscribeChat = id => {
    this.socket.emit('unsubscribeChat', id);
  };
}

export default ChatSocket;

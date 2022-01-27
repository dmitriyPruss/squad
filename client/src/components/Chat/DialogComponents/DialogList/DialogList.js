import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CONSTANTS from '../../../../constants';
import {
  goToExpandedDialog,
  changeChatFavorite,
  changeChatBlock,
  changeShowAddChatToCatalog
} from '../../../../actions/actionCreator';
import DialogBox from '../DialogBox/DialogBox';
import styles from './DialogList.module.sass';

const DialogList = props => {
  const {
    changeChatFavorite,
    changeChatBlock,
    changeShowAddChatToCatalog,
    userId,
    preview,
    goToExpandedDialog,
    chatMode,
    removeChat
  } = props;

  const {
    PREVIEW_CHAT_MODE: { BLOCKED, CATALOG, FAVORITE }
  } = CONSTANTS;

  const changeFavorite = (data, e) => {
    changeChatFavorite(data);
    e.stopPropagation();
  };

  const changeBlackList = (data, e) => {
    changeChatBlock(data);
    e.stopPropagation();
  };

  const changeShowCatalogCreation = (e, chatId) => {
    changeShowAddChatToCatalog(chatId);
    e.stopPropagation();
  };

  const onlyFavDialogs = (chatPreview, userId) => {
    const { favoriteList, participants } = chatPreview;

    return favoriteList[participants.indexOf(userId)];
  };

  const onlyBlockDialogs = (chatPreview, userId) => {
    const { blackList, participants } = chatPreview;

    return blackList[participants.indexOf(userId)];
  };

  const getTimeStr = time => {
    const currentTime = moment();
    if (currentTime.isSame(time, 'day')) {
      return moment(time).format('HH:mm');
    }

    if (currentTime.isSame(time, 'week')) {
      return moment(time).format('dddd');
    }

    if (currentTime.isSame(time, 'year')) {
      return moment(time).format('MM DD');
    }

    return moment(time).format('MMMM DD, YYYY');
  };

  const renderPreview = filterFunc => {
    const arrayList = [];

    preview.forEach((chatPreview, index) => {
      console.log('chatPreview', chatPreview);
      const dialogNode = (
        <DialogBox
          interlocutor={chatPreview.interlocutor}
          chatPreview={chatPreview}
          userId={userId}
          key={index}
          getTimeStr={getTimeStr}
          changeFavorite={changeFavorite}
          changeBlackList={changeBlackList}
          chatMode={chatMode}
          catalogOperation={
            chatMode === CATALOG ? removeChat : changeShowCatalogCreation
          }
          goToExpandedDialog={goToExpandedDialog}
        />
      );
      if (filterFunc && filterFunc(chatPreview, userId)) {
        arrayList.push(dialogNode);
      } else if (!filterFunc) {
        arrayList.push(dialogNode);
      }
    });
    return arrayList.length ? (
      arrayList
    ) : (
      <span className={styles.notFound}>Not found</span>
    );
  };

  const renderChatPreview = () => {
    const { chatMode } = props;
    if (chatMode === FAVORITE) {
      return renderPreview(onlyFavDialogs);
    }
    if (chatMode === BLOCKED) {
      return renderPreview(onlyBlockDialogs);
    }
    return renderPreview();
  };

  return <div className={styles.previewContainer}>{renderChatPreview()}</div>;
};

const mapStateToProps = state => state.chatStore;

const mapDispatchToProps = dispatch => ({
  goToExpandedDialog: data => dispatch(goToExpandedDialog(data)),
  changeChatFavorite: data => dispatch(changeChatFavorite(data)),
  changeChatBlock: data => dispatch(changeChatBlock(data)),
  changeShowAddChatToCatalog: data => dispatch(changeShowAddChatToCatalog(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);

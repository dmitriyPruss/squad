import React from "react";
import { connect } from "react-redux";
import Rating from "react-rating";
import { withRouter } from "react-router-dom";
import isEqual from "lodash/isEqual";
import classNames from "classnames";
import {
  changeMark,
  clearChangeMarkError,
  goToExpandedDialog,
  changeShowImage,
} from "../../actions/actionCreator";
import CONSTANTS from "../../constants";
import styles from "./OfferBox.module.sass";

const OfferBox = (props) => {
  const {
    STATUS: {
      OFFER: { REJECTED, WON },
    },
    CONTEST: { LOGO },
    CREATOR,
    ANONYM_IMAGE_PATH,
    PUBLIC_URL,
    STATIC_IMAGES_PATH,
  } = CONSTANTS;

  const {
    messagesPreview,
    data,
    role,
    id,
    contestType,
    clearError,
    changeMark,
    changeShowImage,
    goToExpandedDialog,
  } = props;

  const { User } = props.data;

  const findConversationInfo = () => {
    const participants = [id, User.id];

    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );

    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        const { participants, id, blackList, favoriteList } =
          messagesPreview[i];

        return {
          participants,
          id,
          blackList,
          favoriteList,
        };
      }
    }

    return null;
  };

  const changeMarkValue = (value) => {
    clearError();

    changeMark({
      mark: value,
      offerId: data.id,
      isFirst: !data.mark,
      creatorId: User.id,
    });
  };

  const offerStatus = () => {
    if (User.status === REJECTED) {
      return (
        <i
          className={classNames("fas fa-times-circle reject", styles.reject)}
        />
      );
    }
    if (User.status === WON) {
      return (
        <i
          className={classNames("fas fa-check-circle resolve", styles.resolve)}
        />
      );
    }

    return null;
  };

  const goChat = () => {
    goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(),
    });
  };

  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={
                User.avatar === "anon.png"
                  ? ANONYM_IMAGE_PATH
                  : `${PUBLIC_URL}${User.avatar}`
              }
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${User.firstName} ${User.lastName}`}</span>
              <span>{User.email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={User.rating}
              fractions={2}
              fullSymbol={
                <img src={`${STATIC_IMAGES_PATH}star.png`} alt="star" />
              }
              placeholderSymbol={
                <img src={`${STATIC_IMAGES_PATH}star.png`} alt="star" />
              }
              emptySymbol={
                <img
                  src={`${STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline"
                />
              }
              readonly
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {contestType === LOGO ? (
            <img
              onClick={() =>
                changeShowImage({
                  imagePath: data.fileName,
                  isShowOnFull: true,
                })
              }
              className={styles.responseLogo}
              src={`${PUBLIC_URL}${data.fileName}`}
              alt="logo"
            />
          ) : (
            <span className={styles.response}>{User.text}</span>
          )}
          {User.id !== id && (
            <Rating
              fractions={2}
              fullSymbol={
                <img src={`${STATIC_IMAGES_PATH}star.png`} alt="star" />
              }
              placeholderSymbol={
                <img src={`${STATIC_IMAGES_PATH}star.png`} alt="star" />
              }
              emptySymbol={
                <img src={`${STATIC_IMAGES_PATH}star-outline.png`} alt="star" />
              }
              onClick={changeMarkValue}
              placeholderRating={User.mark}
            />
          )}
        </div>
        {role !== CREATOR && <i onClick={goChat} className="fas fa-comments" />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    chatStore: { messagesPreview },
    contestByIdStore: { changeMarkError, isShowModal },
    contestByIdStore,
    userStore: {
      data: { id, role },
    },
  } = state;

  return {
    changeMarkError,
    id,
    role,
    messagesPreview,
    isShowModal,
    contestByIdStore,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMark: (data) => dispatch(changeMark(data)),
  clearError: () => dispatch(clearChangeMarkError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OfferBox)
);

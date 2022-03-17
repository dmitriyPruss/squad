import React from "react";
import { connect } from "react-redux";
import Rating from "react-rating";
import { confirmAlert } from "react-confirm-alert";
import {
  changeMark,
  clearChangeMarkError,
  goToExpandedDialog,
  changeShowImage,
  setOfferStatus,
} from "./../../../actions/actionCreator";
import CONSTANTS from "./../../../constants";
import { Button } from "react-bootstrap";
import OfferInfo from "../OfferInfo";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./confirmStyle.css";
import styles from "./CreatorBox.module.scss";

const CreatorBox = (props) => {
  const {
    CONTEST: { LOGO },
    ANONYM_IMAGE_PATH,
    PUBLIC_URL,
    STATIC_IMAGES_PATH,
  } = CONSTANTS;

  const {
    page,
    data: {
      id,
      contestId,
      text,
      fileName,
      "User.id": userId,
      "User.avatar": avatar,
      "User.firstName": firstName,
      "User.lastName": lastName,
      "User.email": email,
      "User.rating": rating,
      "Contest.contestType": contestType,
      "Contest.orderId": orderId,
      "Contest.priority": priority,
    },
    setOfferStatus,
    getOffersForModerator,
  } = props;

  const resolveOffer = () => {
    confirmAlert({
      title: "confirm",
      message: "Are u sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            new Promise((resolve, reject) => {
              setOfferStatus({
                command: "resolve",
                contestId,
                creatorId: userId,
                offerId: id,
                orderId,
                priority: priority,
              });

              setTimeout(() => {
                resolve(true);
              }, 300);
            }).then((res) => {
              getOffersForModerator(page);
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: "confirm",
      message: "Are u sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            new Promise((resolve, reject) => {
              setOfferStatus({
                command: "reject",
                contestId,
                creatorId: userId,
                offerId: id,
                orderId,
                priority: priority,
              });

              setTimeout(() => {
                resolve(true);
              }, 300);
            }).then((res) => {
              getOffersForModerator(page);
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <article className={styles.offerContainer}>
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={
                avatar === "anon.png"
                  ? ANONYM_IMAGE_PATH
                  : `${PUBLIC_URL}${avatar}`
              }
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              className={styles.ratingStars}
              initialRating={rating}
              fractions={2}
              fullSymbol={
                <img
                  className={styles.ratingStar}
                  src={`${STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              placeholderSymbol={
                <img
                  className={styles.ratingStar}
                  src={`${STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              emptySymbol={
                <img
                  className={styles.ratingStar}
                  src={`${STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline"
                />
              }
              readonly
            />
          </div>
        </div>
        <div className={styles.responseContainer}>
          {contestType === LOGO ? (
            <div className={styles.responseImg}>
              <span>Logo </span>
              <img
                className={styles.responseLogo}
                src={`${PUBLIC_URL}${fileName}`}
                alt="logo"
              />
            </div>
          ) : (
            <span className={styles.response}>{text}</span>
          )}
        </div>
      </div>
      <OfferInfo data={props.data} />
      <div className={styles.btnsContainer}>
        <Button
          as="button"
          variant="outline-success"
          className={styles.resolveBtn}
          onClick={resolveOffer}
        >
          Confirm
        </Button>
        <Button
          as="button"
          variant="outline-danger"
          className={styles.rejectBtn}
          onClick={rejectOffer}
        >
          Reject
        </Button>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => {
  const {
    chatStore: { messagesPreview },
    contestByIdStore: { changeMarkError, isShowModal },
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMark: (data) => dispatch(changeMark(data)),
  clearError: () => dispatch(clearChangeMarkError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatorBox);

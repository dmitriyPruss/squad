import React from "react";
import { connect } from "react-redux";
import Rating from "react-rating";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { confirmAlert } from "react-confirm-alert";
import {
  changeMark,
  clearChangeMarkError,
  goToExpandedDialog,
  changeShowImage,
  checkOfferSendmailAction,
  setOfferStatus,
  changeOfferStatusAction,
} from "./../../../actions/actionCreator";
import CONSTANTS from "./../../../constants";
import { Button } from "react-bootstrap";
import styles from "./CreatorBox.module.sass";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./confirmStyle.css";
import OfferInfo from "../OfferInfo";

const CreatorBox = (props) => {
  const {
    STATUS: {
      OFFER: { REJECTED, WON },
    },
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
      status,
      "User.id": User_id,
      "User.avatar": User_avatar,
      "User.firstName": User_firstName,
      "User.lastName": User_lastName,
      "User.email": User_email,
      "User.rating": User_rating,
      "Contest.contestType": Contest_contestType,
      "Contest.orderId": Contest_orderId,
      "Contest.priority": Contest_priority,
    },
    setOfferStatus,
    checkNewOffer,
  } = props;

  console.log("CREATOR_BOX props.data", props.data);

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
                creatorId: User_id,
                offerId: id,
                orderId: Contest_orderId,
                priority: Contest_priority,
              });

              setTimeout(() => {
                console.log('before or after?');
                resolve(true);
              }, 300);
            }).then((res) => {
              console.log("res", res);
              checkNewOffer(page);
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
                creatorId: User_id,
                offerId: id,
                orderId: Contest_orderId,
                priority: Contest_priority,
              });

              setTimeout(() => {
                console.log('before or after?');
                resolve(true);
              }, 300);
            }).then((res) => {
              console.log("res reject", res);
              checkNewOffer(page);
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  // // const changeMarkValue = (value) => {
  // //   clearError();
  // //   changeMark({
  // //     mark: value,
  // //     offerId: id,
  // //     isFirst: !data.mark,
  // //     creatorId: User.id,
  // //   });
  // // };

  const offerStatus = () => {
    if (status === REJECTED) {
      return <i className={classNames("fas fa-times-circle reject", styles.reject)} />;
    }
    if (status === WON) {
      return <i className={classNames("fas fa-check-circle resolve", styles.resolve)} />;
    }
    return null;
  };
  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={User_avatar === "anon.png" ? ANONYM_IMAGE_PATH : `${PUBLIC_URL}${User_avatar}`}
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${User_firstName} ${User_lastName}`}</span>
              <span>{User_email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={User_rating}
              fractions={2}
              fullSymbol={<img src={`${STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${STATIC_IMAGES_PATH}star.png`} alt="star" />}
              emptySymbol={<img src={`${STATIC_IMAGES_PATH}star-outline.png`} alt="star-outline" />}
              readonly
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {Contest_contestType === LOGO ? (
            <img
              onClick={() =>
                changeShowImage({
                  imagePath: fileName,
                  isShowOnFull: true,
                })
              }
              className={styles.responseLogo}
              src={`${PUBLIC_URL}${fileName}`}
              alt="logo"
            />
          ) : (
            <span className={styles.response}>{text}</span>
          )}
        </div>
      </div>
      <OfferInfo
        data={props.data}
        // userId={id}
        // contestData={contestData}
        // changeEditContest={changeEditContest}
        // role={role}
        // goChat={goChat}
      />
      {props.needButtons(status) && (
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
            as="input"
            variant="outline-danger"
            className={styles.rejectBtn}
            onClick={rejectOffer}
            defaultValue="Reject"
          />
        </div>
      )}
    </div>
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
  checkOfferEmail: (data) => dispatch(checkOfferSendmailAction(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  changeOfferStatus: (data) => dispatch(changeOfferStatusAction(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorBox));

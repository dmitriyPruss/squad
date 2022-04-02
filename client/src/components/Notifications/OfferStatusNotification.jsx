import React from "react";
import { withRouter } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import CONSTANTS from "../../constants";
import styles from "./Notification.module.sass";

const { PUBLIC_URL, ANONYM_IMAGE_PATH } = CONSTANTS;

const OfferStatusNotification = (props) => {
  const {
    message,
    contestId,
    history,
    data: { firstName, lastName, avatar, role },
  } = props;

  return (
    <Alert
      className={styles.markOrOfferNotation}
      variant={
        message === "Some of your offers were rejected" ? "danger" : "success"
      }
    >
      <div className={styles.userInfo}>
        <span>{`${firstName} ${lastName}`}</span>
        <img
          src={
            avatar === "anon.png" ? ANONYM_IMAGE_PATH : `${PUBLIC_URL}${avatar}`
          }
          alt={role}
        />
      </div>
      <span>{message}</span>
      <br />
      {contestId && (
        <span
          onClick={() => history.push(`/contest/${contestId}`)}
          className={styles.goToContest}
        >
          Go to contest
        </span>
      )}
    </Alert>
  );
};

export default withRouter(OfferStatusNotification);

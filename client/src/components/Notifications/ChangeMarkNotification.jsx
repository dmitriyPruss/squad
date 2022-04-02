import React from "react";
import Alert from "react-bootstrap/Alert";
import CONSTANTS from "../../constants";
import styles from "./Notification.module.sass";

const { PUBLIC_URL, ANONYM_IMAGE_PATH } = CONSTANTS;

const ChangeMarkNotification = (props) => {
  const {
    data: { firstName, lastName, avatar, role },
  } = props;

  return (
    <Alert className={styles.markOrOfferNotation} variant="primary">
      <div className={styles.userInfo}>
        <span>{`${firstName} ${lastName}`}</span>
        <img
          src={
            avatar === "anon.png" ? ANONYM_IMAGE_PATH : `${PUBLIC_URL}${avatar}`
          }
          alt={role}
        />
      </div>
      <div className={styles.markMessage}>
        <span>Customer liked your offer</span>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />
      </div>
    </Alert>
  );
};

export default ChangeMarkNotification;

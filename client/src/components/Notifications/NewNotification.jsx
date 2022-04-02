import React from "react";
import CONSTANTS from "../../constants";
import styles from "./Notification.module.sass";

const { PUBLIC_URL, ANONYM_IMAGE_PATH } = CONSTANTS;

const NewNotification = (props) => {
  const {
    data: { firstName, lastName, avatar, role },
  } = props;

  return (
    <div className={styles.newNotation}>
      <div className={styles.userInfo}>
        <span>{`${firstName} ${lastName}`}</span>
        <img
          src={
            avatar === "anon.png" ? ANONYM_IMAGE_PATH : `${PUBLIC_URL}${avatar}`
          }
          alt={role}
        />
      </div>
      <div className={styles.message}>
        {role === "creator"
          ? "Creator sent a new offer. Please, update your page"
          : "Customer sent a new contest. Please, update your page"}
      </div>
    </div>
  );
};

export default NewNotification;

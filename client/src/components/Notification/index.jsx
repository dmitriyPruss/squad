import React from "react";
import { withRouter } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import styles from "./Notification.module.sass";

const Notification = (props) => {
  const { message, contestId, history } = props;

  return (
    <Alert
      variant={
        message === "Some of your offers have won" ? "success" : "danger"
      }
    >
      <br />
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

export default withRouter(Notification);

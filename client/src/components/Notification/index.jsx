import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Notification.module.sass';

const Notification = props => {
  const { message, contestId, history } = props;

  return (
    <div>
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
    </div>
  );
};

export default withRouter(Notification);

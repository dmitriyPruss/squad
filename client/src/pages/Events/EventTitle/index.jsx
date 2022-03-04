import React from "react";
import { ReactComponent as Clock } from "./clock.svg";
import styles from "./EventTitle.module.scss";

function EventTitle(props) {
  const { timeendData } = props;

  return (
    <article className={styles.eventHeader}>
      <h2>Live upcomming checks</h2>
      <div>
        <span>Remaining time: </span>
        <Clock />
        {timeendData.length > 0 ? (
          <span className={styles.pastEvents}>
            Quantity of past events: {timeendData.length}
          </span>
        ) : (
          ""
        )}
      </div>
    </article>
  );
}

export default EventTitle;

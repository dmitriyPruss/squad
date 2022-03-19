import React, { useEffect } from "react";
import styles from "./../Events.module.scss";

function TimeIsOver(props) {
  const { id, finishItem } = props;

  useEffect(() => finishItem(id), []);

  return (
    <div className={styles.timeIsOver}>
      <span>Time is over!</span>
    </div>
  );
}

export default TimeIsOver;

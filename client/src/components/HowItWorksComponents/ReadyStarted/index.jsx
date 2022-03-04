import React from "react";
import { ReactComponent as AbstractImg } from "./svg_images/abstractImg.svg";
import { ReactComponent as LeavesImg } from "./svg_images/leavesImg.svg";
import CONSTANTS from "../../../constants";
import styles from "./ReadyStarted.module.scss";

function ReadyStarted() {
  const {
    HOW_IT_WORKS: { START_CONTEST },
  } = CONSTANTS;

  return (
    <section className={styles.readyStartedItem}>
      <h2>Ready to get started?</h2>
      <p>
        Fill out your contest brief and begin receiving custom name suggestions
        within minutes.
      </p>
      <a href={START_CONTEST.link}>{START_CONTEST.text}</a>

      <AbstractImg className={styles.abstractImg} />
      <LeavesImg className={styles.leavesImg} />
    </section>
  );
}

export default ReadyStarted;

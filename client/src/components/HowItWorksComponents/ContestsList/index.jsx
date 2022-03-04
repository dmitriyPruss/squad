import React from "react";
import InfoContest from "../InfoContest";
import CONSTANTS from "../../../constants";
import styles from "./ContestsList.module.scss";

function ContestsList() {
  const {
    HOW_IT_WORKS: { CONTEST_LIST },
  } = CONSTANTS;

  const showContestList = (item, index) => (
    <li key={index}>
      <a href={item.link}>{item.text}</a>
    </li>
  );

  return (
    <article className={styles.listContainer}>
      <ul className={styles.listGroup}>{CONTEST_LIST.map(showContestList)}</ul>
      <InfoContest />
    </article>
  );
}

export default ContestsList;

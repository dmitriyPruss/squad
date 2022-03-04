import React from "react";
import { ReactComponent as PcUser } from "./pcUser.svg";
import { ReactComponent as PrizeCup } from "./prizeCup.svg";
import contestWorkData from "./contestWorkData.json";
import styles from "./NamingContestWork.module.scss";

function NamingContestWork() {
  return (
    <article className={styles.contestWorkContainer}>
      <section className={styles.headerContestBlock}>
        <PrizeCup style={{ width: "70px" }} />
        <h2>How Do Naming Contests Work?</h2>
      </section>
      <div className={styles.mainContestBlock}>
        <PcUser />

        <ul className={styles.contestWorkItems}>
          {contestWorkData.map((item, index) => (
            <li className={styles.workItem} key={index}>
              <p className={styles.workItemNum}>{index + 1}.</p>
              <p className={styles.workItemContext}>{item}</p>
            </li>
          ))}
          <li className={styles.linesVisualItem} key={contestWorkData.length}>
            <p></p>
            <p></p>
            <p></p>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default NamingContestWork;

import React from "react";
import InfoItem from "./Items/InfoItem";
import contestData from "./InfoData/contestData.json";
import marketplaceData from "./InfoData/marketplaceData.json";
import managedData from "./InfoData/managedData.json";
import creativeData from "./InfoData/creativeData.json";
import CONSTANTS from "../../../constants";
import styles from "./InfoContest.module.scss";

function LaunchingContest() {
  const {
    HOW_IT_WORKS: { CONTEST_LIST },
  } = CONSTANTS;

  const infoData = [contestData, marketplaceData, managedData, creativeData];

  CONTEST_LIST.forEach((i, index) => {
    i.data = infoData[index];
    i.id = i.link.substring(1);
  });

  const showList = (item, index) => (
    <section key={index} id={item.id} className={styles.launchingContests}>
      <h3 className={styles.contextHeader}>{item.text}</h3>
      <ul>
        {item.data.map((i, index) => (
          <InfoItem key={index} info={i} index={index} sectionId={item.id} />
        ))}
      </ul>
    </section>
  );

  return (
    <article className={styles.contestList}>
      {CONTEST_LIST.map(showList)}
    </article>
  );
}

export default LaunchingContest;

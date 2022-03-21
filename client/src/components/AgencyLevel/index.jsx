import React from "react";
import DataColumn from "./DataColumn";
import LevelElement from "./LevelElement";
import agencyExpData from "./agencyExperience.json";
import styles from "./AgencyLevel.module.scss";

const AgencyLevel = () => {
  const columnsRender = (data) => (
    <ul className={styles.agencyElementsContainer}>
      {data.map((levelElementData, index) => (
        <LevelElement key={index} levelElementData={levelElementData} />
      ))}
    </ul>
  );
  return (
    <article className={styles.agencyLevelContainer}>
      <h2>Agency Level Experience</h2>
      <DataColumn data={agencyExpData} render={columnsRender} />
    </article>
  );
};

export default AgencyLevel;

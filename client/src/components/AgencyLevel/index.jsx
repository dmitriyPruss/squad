import React, { Component } from 'react';
import DataColumn from '../DataColumn';
import LevelElement from './LevelElement';
import styles from './AgencyLevel.module.scss';

const AgencyLevel = () => {
  const columnsRender = ({ data, isFetching, error }) => (
    <>
      {isFetching && <div style={{ color: 'blue' }}>Loading...</div>}
      {error && <div style={{ color: 'red' }}>ERROR</div>}
      <ul className={styles.agencyElementsContainer}>
        {data.map(levelElementData => (
          <LevelElement levelElementData={levelElementData} />
        ))}
      </ul>
    </>
  );
  return (
    <article className={styles.agencyLevelContainer}>
      <h2>Agency Level Experience</h2>
      <DataColumn fileName='agencyExperience.json' render={columnsRender} />
    </article>
  );
};

export default AgencyLevel;

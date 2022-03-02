import React from 'react';
import InfoItem from './Items/InfoItem';
import contestData from './InfoData/contestData.json';
import marketplaceData from './InfoData/marketplaceData.json';
import managedData from './InfoData/managedData.json';
import creativeData from './InfoData/creativeData.json';
import styles from './InfoContest.module.scss';

function LaunchingContest () {
  return (
    <article className={styles.contestList}>
      <section id='contests' className={styles.launchingContests}>
        <h3 className={styles.contextHeader}>Launching A Contest</h3>
        <ul>
          {contestData.map((i, index) => (
            <InfoItem key={index} info={i} index={index} />
          ))}
        </ul>
      </section>
      <section id='marketplace' className={styles.launchingContests}>
        <h3 className={styles.contextHeader}>Buying From Marketplace</h3>
        <ul>
          {marketplaceData.map((i, index) => (
            <InfoItem key={index} info={i} index={index} />
          ))}
        </ul>
      </section>
      <section id='managed' className={styles.launchingContests}>
        <h3 className={styles.contextHeader}>Managed Contests</h3>
        <ul>
          {managedData.map((i, index) => (
            <InfoItem key={index} sectionId={'managed'} info={i} index={index} />
          ))}
        </ul>
      </section>
      <section id='creatives' className={styles.launchingContests}>
        <h3 className={styles.contextHeader}>For Creatives</h3>
        <ul>
          {creativeData.map((i, index) => (
            <InfoItem key={index} info={i} index={index} />
          ))}
        </ul>
      </section>
    </article>
  );
}

export default LaunchingContest;

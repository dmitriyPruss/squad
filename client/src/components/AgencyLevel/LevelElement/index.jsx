import React from 'react';
import styles from './LevelElement.module.scss';

function LevelElement (props) {
  const {
    levelElementData: { id, src, header, mainContent, learnMoreLink },
  } = props;
  return (
    <li key={id} className={styles.agencyElement}>
      <div className={styles.imgContainer}>
        <img src={src} width={50} />
      </div>
      <section>
        <h3>{header}</h3>
        <p>
          {mainContent}
          <br />
          <a href={learnMoreLink}>Learn More</a>
        </p>
      </section>
    </li>
  );
}

export default LevelElement;

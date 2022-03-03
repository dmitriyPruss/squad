import React from 'react';
import styles from './../InfoContest.module.scss';

function ButtonItem (props) {
  const { children, view, changeView, decoratedClick } = props;

  return (
    <button
      className={styles.launchingButton}
      onClick={() => {
        changeView();
        decoratedClick();
      }}
    >
      <span>{children}</span>
      <span>
        {view ? (
          <i
            className={`fas fa-arrow-right ${styles.arrowDown}`}
          ></i>
        ) : (
          <i
            className={`fas fa-arrow-right ${styles.arrowRight}`}
          ></i>
        )}
      </span>
    </button>
  );
}

export default ButtonItem;
